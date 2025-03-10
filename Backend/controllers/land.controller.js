import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/land.model.js";
import Land from "../models/land.model.js";



const registerLand = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        console.log(body)
        const landData = await Land.create(body)
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
    registerLand
}