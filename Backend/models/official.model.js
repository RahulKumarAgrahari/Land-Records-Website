import mongoose from "mongoose";

const officialSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    designation: {
        type: String,
        required: true,
        // enum: ["1", "2", "HR", "Admin", "Intern", "CEO", "CTO"], // Allowed values
        // default: "Intern" // Default designation
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Ensures phone number is unique
        match: [/^\d{10}$/, "Phone number must be 10 digits"] // Validates 10-digit numbers
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    office_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures username is unique
        minlength: 3, // Minimum length of 3 characters
        maxlength: 20, // Maximum length of 20 characters
        match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
},
    {
        timestamps: true
    });

const Official = mongoose.model('Official', officialSchema);
export default Official