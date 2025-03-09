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
    gender:{
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
},
{
    timestamps:true
});

const User = mongoose.model('User', userSchema);
export default User