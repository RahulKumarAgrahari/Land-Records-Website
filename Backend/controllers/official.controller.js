import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Official from "../models/official.model.js";


const loginOfficial = async (req, res) => {
    const body = req.body
    try {
        const userData = await Official.findOne({ office_id: body.officialId, designation:body.role })
        if (userData && userData.password == body.password) {

            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.send({
                message: "Login successfull",
                status: true,
                data: {
                    id: userData._id,
                    username: userData.username,
                    office_id: userData.office_id,
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


const createOfficial = async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        console.log(body)
        const userData = await Official.create(body)
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
};

export {
    createOfficial,
    loginOfficial
}