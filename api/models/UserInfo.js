import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String, 
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        realname: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
        },
        // follwers: {
        //     type: Number,
        //     requiredtrue,
        // },
        // following: {
        //     type: Number,
        //     requiredtrue,
        // },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        },
        { timestamps: true }
);

export default mongoose.model("UserInfo", UserSchema);