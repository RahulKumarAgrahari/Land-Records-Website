import { Land, LandHistory } from "../models/land.model.js";
import jwt from "jsonwebtoken";
import { landReceipt } from "../models/recipt.model.js";
import status from "statuses";

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token; // ✅ Get token from cookies

//     if (!token) return res.status(403).json({ message: "Unauthorized! Token required." });

//     try {
//         // ✅ Decode JWT & extract user ID
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user data to request

//         next(); // Proceed to the next middleware
//     } catch (err) {
//         res.status(401).json({ message: "Invalid or expired token" });
//     }
// };

const generateApplicationId = () => {
    return "APP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};
const generateServeNo = () => {
    return "SN-" + Date.now() + "-" + Math.floor(Math.random() * 22);
};
const generateReciptNo = () => {
    return Date.now();
};

const createLandRecipt = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const reciptNo = await generateReciptNo();
        const serveNo = await generateServeNo();
        const landData = await landReceipt.create({ ...body, createdBy: decoded.id, receiptId: reciptNo, survey_no: serveNo })
        if (landData) {
            res.send({
                message: `Land registration successful!\nReceipt No: ${reciptNo}\nSubmitted by: ${landData.full_name}`,
                status: true,
                data: {
                    reciptNo
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
const getReciptList = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const query = {
            createdBy: decoded.id
        }
        // Case-sensitive regex search (no 'i' flag)
        if (body.status) {
            if (Array.isArray(body.status)) {
                query.status = { $in: body.status };
            } else {
                query.status = body.status
            }
        }
        if (body.survey_no) {
            query.survey_no = new RegExp(body.survey_no);
        }
        if (body.receiptId) {
            query.receiptId = new RegExp(body.receiptId);
        }
        // if (body.owner_name) {
        //     query.owner_name = new RegExp(body.owner_name);
        // }
        const landData = await landReceipt.find(query).skip(body.skip).limit(body.limit);
        const totalRecords = await landReceipt.countDocuments(query);
        if (landData) {
            res.send({
                message: "list recipt",
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
const getRecipt = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    const paramas = req.params
    try {
        const token = req.headers.authrization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const query = {
            createdBy: decoded.id,
            receiptId: paramas.receiptId
        }
        if (body.status) {
            query.status = body.status
        }
        const reciptData = await landReceipt.findOne(query)
        if (reciptData) {
            res.send({
                message: "success",
                status: true,
                data: reciptData
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
const regLand = async (req, updatedLand) => {
    const body = req.body
    const token = req.headers.authrization
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const applicationId = await generateApplicationId();
    const data = {
        email: updatedLand.email,
        phone: updatedLand.phone,
        aadhar: updatedLand.aadhar,
        owner_name: updatedLand.owner_name,
        full_name: updatedLand.full_name,
        survey_no: updatedLand.survey_no,
        area: updatedLand.area,
        state: updatedLand.state,
        city: updatedLand.city,
        pincode: "656598",
        address: updatedLand.address,
        dob: updatedLand.dob
        // landId
    }
    const landData = await Land.create({ createdBy: decoded.id, applicationId, ...data })
    if (landData) {
        await LandHistory.create({
            landId: landData._id,
            action: "Created",
            newData: landData,
            changedBy: decoded.id, // Assuming you have user authentication
        });
    }
}
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
                message: `Land registration successful!\nReceipt No: ${applicationId}\nSubmitted by: ${landData.full_name}`,
                status: true,
                data: {
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
const updateLandReciptStatus = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const body = req.body
    try {
        let update = { reviewedBy: body.reviewedBY }
        update.status = body.status || 'rejected'
        const updatedLand = await landReceipt.updateOne(
            { _id: body.id },  // Filter by ID
            { $set: update } // Dynamically set the field to update
        );

        if (updatedLand.modifiedCount > 0) {
            if (body.status == 'file') {
                const data = await landReceipt.findOne({ _id: body.id })
                regLand(req, data)
            }
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
const getLandRecordCondition = async (dbData) => {
    const query = {}
    Object.keys(dbData).forEach((key) => {
        if (![null, undefined].includes(dbData[key]) && !['limit', 'page'].includes(key)) {
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
const getLandRecordReviewedBy = async (req, res) => {
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
        let update = { reviewedBy: body.reviewedBY }
        if (body.reviewedBY == 'admin') {
            update.status = 'approved'
        }
        if (body.status == 'rejected') {
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

const getLandData = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const paramas = req.params
        const query = { _id: paramas.id }
        const landData = await Land.findOne(query);
        res.send({
            message: "sucess",
            status: true,
            data: landData
        })
    } catch (error) {

    }
}

export {
    registerLand,
    getLandRecord,
    getLandRecordClerk,
    updateLandRecordStatus,
    getLandRecordReviewedBy,
    createLandRecipt,
    getReciptList,
    getRecipt,
    updateLandReciptStatus,
    getLandData
}