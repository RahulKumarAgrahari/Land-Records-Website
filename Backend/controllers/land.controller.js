import { Land, LandHistory } from "../models/land.model.js";
import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token; // ✅ Get token from cookies

//     if (!token) return res.status(403).json({ message: "Unauthorized! Token required." });

//     try {
//         // ✅ Decode JWT & extract user ID
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user data to request
//         console.log("Decoded Token:", decoded); // Debugging

//         next(); // Proceed to the next middleware
//     } catch (err) {
//         res.status(401).json({ message: "Invalid or expired token" });
//     }
// };


const registerLand = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token=req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const landData = await Land.create({...body, createdBy: decoded.id})
        if (landData) {
            await LandHistory.create({
                landId: landData._id,
                action: "Created",
                newData: landData,
                changedBy: decoded.id, // Assuming you have user authentication
            });
            res.send({
                message: "land register application submitted sucessfully",
                status: true
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
                errors: errorMessages,
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
                errors: errorMessages,
                status: false
            });
            return
        }

        // For other errors (e.g., database issues)
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
            status: false
        });
    }
}

const getLandRecord = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token=req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const landData = await Land.find({createdBy:decoded.id})
        console.log(landData)
        if (landData) {
            res.send({
                message: "land register application submitted sucessfully",
                status: true,
                data:landData
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
                errors: errorMessages,
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
                errors: errorMessages,
                status: false
            });
            return
        }

        // For other errors (e.g., database issues)
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
            status: false
        });
    }
}
export {
    registerLand,
    getLandRecord
}