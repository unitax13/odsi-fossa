const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') ) {
        try {
            // Get token from header
            //console.log("req.headers.authorization: " + req.headers.authorization)
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token and assign it to req.user
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}

// Oświadczam, że niniejsza praw będąca podstawą do uznania efektów uczenia się została przeze mnie wykonana samodzielnie bez uzycia żadnych materiałów.