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

const generateApplicationId = () => {
    return "APP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};

const registerLand = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const applicationId = await generateApplicationId();
        const landData = await Land.create({ ...body, createdBy: decoded.id, applicationId })
        if (landData) {
            await LandHistory.create({
                landId: landData._id,
                action: "Created",
                newData: landData,
                changedBy: decoded.id, // Assuming you have user authentication
            });
            res.send({
                message: "land register application submitted sucessfully",
                status: true,
                data:{
                    applicationId
                }
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
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

const getLandRecord = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const landData = await Land.find({ createdBy: decoded.id }).skip(body.skip).limit(body.limit);
        const totalRecords = await Land.countDocuments({ createdBy: decoded.id });
        if (landData) {
            res.send({
                message: "land register application submitted sucessfully",
                status: true,
                data: landData,
                pagination: {
                    currentPage: body.page,
                    totalPages: Math.ceil(totalRecords / body.limit),
                    total: totalRecords
                }
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
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
const getLandRecordCondition = async (dbData) => {
    const query = {}
    Object.keys(dbData).forEach((key) => {
        if (dbData[key] && !['limit', 'page'].includes(key)) {
            query[key] = dbData[key]
        }
    })
    const landData = await Land.find(query).skip((dbData.page - 1) * dbData.limit).limit(dbData.limit);
    const totalRecords = await Land.countDocuments(query);
    return {
        data: landData,
        pagination: {
            currentPage: dbData.page,
            totalPages: Math.ceil(totalRecords / dbData.limit),
            total: totalRecords
        }
    }
}
const getLandRecordClerk = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const landData = await Land.find({createdBy:decoded.id}).skip(body.skip).limit(body.limit);
        // const totalRecords = await Land.countDocuments({ createdBy: decoded.id });
        // console.log(landData)
        const landData = await getLandRecordCondition({
            reviewedBy: '',
            status: 'pending',
            limit: body.limit,
            page: body.page
        })
        if (landData) {
            res.send({
                message: "sucess",
                status: true,
                ...landData
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
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
const getLandRecordre = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const landData = await getLandRecordCondition({
            reviewedBy: body.reviewedBY,
            status: 'pending',
            limit: body.limit,
            page: body.page
        })
        if (landData) {
            res.send({
                message: "sucess",
                status: true,
                ...landData
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
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
const updateLandRecordStatus = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        let update = {reviewedBy: body.reviewedBY}
        if(body.status == 'rejected') {
            update.status = 'rejected'
        }
        const updatedLand = await Land.updateOne(
            { _id: body.id },  // Filter by ID
            { $set: update } // Dynamically set the field to update
        );
        if (updatedLand.modifiedCount > 0) {
            res.send({
                message: "Status updated successfully",
                status: true
            })
        } else {
            res.status(500).json({
                message: 'Somthing went wrong',
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
    getLandRecord,
    getLandRecordClerk,
    updateLandRecordStatus,
    getLandRecordre
}