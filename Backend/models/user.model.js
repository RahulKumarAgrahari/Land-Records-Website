import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    middle_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
        min: new Date('1900-01-01'), // Minimum date (1st Jan 1900)
        max: new Date() // Maximum date (Today’s date)
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"] // Restrict values to predefined options
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
    aadhar: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate Aadhar numbers
        match: [/^\d{12}$/, "Aadhar number must be exactly 12 digits"] // Validates 12-digit format
    },
    address: {
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

const User = mongoose.model('User', userSchema);
export default User