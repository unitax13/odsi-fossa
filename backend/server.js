const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')
const bodyParser = require("body-parser")

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => res.status(200).json({message: 'Hello, / (main page)'}));

app.use('/api/memos', require('./routes/memoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//serve frontend
if (process.env.NODE_ENV === 'production') {
    console.log("Starting in production...")
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend','build','index.html'))
    })
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));
 
console.log("Hello world!");
