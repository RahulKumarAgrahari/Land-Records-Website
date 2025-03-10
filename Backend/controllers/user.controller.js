import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const loginUser = async (req, res) => {
    const body = req.body
    try {
        const userData = await User.findOne({ username: body.username })
        if (userData && userData.password == body.password) {

            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.send({
                message: "Login successfull",
                status: true,
                data: {
                    id: userData._id,
                    username: userData.username,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    token
                }
            })
            return
        } else {
            res.status(401).json({
                message: 'Invalid credential',
                status: false
            });
        }
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
};

const createUser = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        console.log(body)
        const userData = await User.create(body)
        res.send({
            message: "User Created Successfuly",
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
}
export {
    loginUser,
    createUser
}