import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
import user from './models/user.model.js'
import official from './models/official.model.js'
const PORT = 8080

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})
try {
    await mongoose.connect('mongodb+srv://67rahulrbgj:u58FZci4ikDRFTrr@cluster0.bv4fp.mongodb.net/')
    console.log("connection successfull")
    app.get('/', function (req, res) {
        res.send('Hello World')

    })
    app.post('/user-login', async function (req, res) {
        const body = req.body
        try {
            const { username, password } = body;
            const user = await User.findOne({ username, password });
            if (user) {
                res.send({
                    message: "Login successfuly",
                    data: user,
                    status: true
                })
            }

        } catch (error) {
            if (err.name === 'ValidationError') {
                // Collect all validation errors
                const errorMessages = [];
                for (let field in err.errors) {
                    errorMessages.push(err.errors[field].message); // Store the error messages
                }

                // Return the errors to the client
                res.status(400).json({
                    message: 'Validation errors',
                    errors: errorMessages
                });
                return
            }

            // For other errors (e.g., database issues)
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    })
    app.post('/create-user', async function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        const body = req.body
        try {
            console.log(body)
            const userData = await user.create(body)
            res.send({
                message: "user created successfuly",
                status: true
            })
        } catch (err) {

            if (err.name === 'ValidationError') {
                // Collect all validation errors
                const errorMessages = [];
                for (let field in err.errors) {
                    errorMessages.push(err.errors[field].message); // Store the error messages
                }

                // Return the errors to the client
                res.status(400).json({
                    message: 'Validation errors',
                    errors: errorMessages
                });
                return
            }

            // For other errors (e.g., database issues)
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    })
    app.post('/create-official', async function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        const body = req.body
        try {
            console.log(body)
            const userData = await official.create(body)
            res.send({
                message: "Official Created Successfuly",
                status: true
            })
        } catch (err) {

            if (err.name === 'ValidationError') {
                // Collect all validation errors
                const errorMessages = [];
                for (let field in err.errors) {
                    errorMessages.push(err.errors[field].message); // Store the error messages
                }

                // Return the errors to the client
                res.status(400).json({
                    message: 'Validation errors',
                    errors: errorMessages
                });
                return
            }

            // For other errors (e.g., database issues)
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    })
    app.post('/login', async function (req, res) {
        const body = req.body
        try {
            const userData = await user.findOne({ email: body.email })
            if (!userData) {
                res.status(404).json({
                    status: false,
                    message: "user not found"
                })
                return
            }
            res.send({
                status: true,
                data: { ...userData._doc, token: "jsfgjshgfhsdgfshdfhs" }
            })
        } catch (err) {
            if (err.name === 'ValidationError') {
                // Collect all validation errors
                const errorMessages = [];
                for (let field in err.errors) {
                    errorMessages.push(err.errors[field].message); // Store the error messages
                }

                // Return the errors to the client
                res.status(400).json({
                    message: 'Validation errors',
                    errors: errorMessages
                });
                return
            }

            // For other errors (e.g., database issues)
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    })
    app.listen(PORT)
    console.log("listning to port : ", PORT)
} catch (error) {
    console.log(err)
    res.send(err)
}

