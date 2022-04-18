const asyncHandler = require('express-async-handler')
const { findById } = require('../models/memoModel')

const Memo = require('../models/memoModel')
const User = require('../models/userModel')

// @desc Get memos
// @route GET /api/memos
// @access Private
const getMemos = asyncHandler(async (req,res) => {

    const memos = await Memo.find({user: req.user.id})

    res.status(200).json(memos)
})

// @desc Set memo
// @route POST /api/memos
// @access Private
const setMemo = asyncHandler(async (req,res) => {
    if (!req.body.markdown) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    const memo = await Memo.create({
        markdown: req.body.markdown,
        user: req.user.id
    })

    res.status(200).json(memo)
})

// @desc Update memo
// @route PUT /api/memos/:id
// @access Private
const updateMemo = asyncHandler(async (req,res) => {

    const memo = await Memo.findById(req.params.id)

    if (!memo) {
        res.status(400)
        throw new Error('Memo not found')
    }

        //Check for user
        if (!req.user) {
            res.status(401)
            throw new Error('User not found')
        }
    
        // make sure the logged in user matches the memo user
        if (memo.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        let updatedMemo = await Memo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        res.status(200).json(updatedMemo)

    
})

// @desc Delete memo
// @route DELETE /api/memos/:id
// @access Private
const deleteMemo = asyncHandler(async (req,res) => {

    const memo = await Memo.findById(req.params.id)

    if (!memo) {
        res.status(400)
        throw new Error('Memo not found')
    }

        //Check for user
        if (!req.user) {
            res.status(401)
            throw new Error('User not found')
        }
    
        // make sure the logged in user matches the memo user
        if (memo.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

    await memo.remove()

    res.status(200).json({id: req.params.id})
})



module.exports = {
    getMemos,
    setMemo,
    updateMemo,
    deleteMemo
}