import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,        
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,        
        match: [/^\d{10}$/, "Phone number must be 10 digits"] // Validates 10-digit numbers
    },
    aadhar: {
        type: String,
        required: true,        
        match: [/^\d{12}$/, "Aadhar number must be exactly 12 digits"] // Validates 12-digit format
    },
    dor: {
        type: Date,
        required: true,
        min: new Date('1900-01-01'), // Minimum date (1st Jan 1900)
        max: new Date() // Maximum date (Today’s date)
    },
    owner_name: {
        type: String,
        required: true,        
        minlength: 3, // Minimum length of 3 characters
        maxlength: 20, // Maximum length of 20 characters
        match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
    },
    survey_no: {
        type: String,
        unique: true,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Pincode must be 6 digits"] // Validates 6-digit numbers
    },
    address: {
        type: String,
        required: true
    },
    document: {
        type: String,
    }
},
    {
        timestamps: true
    });

const Land = mongoose.model('land', landSchema);
const landHistorySchema = new mongoose.Schema({
    landId: { type: mongoose.Schema.Types.ObjectId, ref: "Land", required: true },
    action: { type: String, enum: ["Created", "Updated", "Transferred", "Approved", "Rejected"], required: true },
    previousData: { type: Object }, // Stores previous state before update
    newData: { type: Object }, // Stores new state after update
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now }
});
const LandHistory = mongoose.model("LandHistory", landHistorySchema);
export { Land, LandHistory }