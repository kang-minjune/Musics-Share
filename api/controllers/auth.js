import User from "../models/UserInfo.js";
import bcrypt from "bcryptjs";
import { createError } from '../utils/error.js';
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body, //패스워드를 뺀 나머지가 들어간다.(패스워드를 구분하기 위함)
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }
        
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'strict',
            domain: "localhost",
            path: '/',
        }).status(200)
        .json({ details: {...otherDetails}, isAdmin, token });
        console.log(token);
    } catch (err) {
        next(err);
    }
};


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        sameSite: 'strict',
        domain:"localhost"
    })
    .status(200)
    .json({message: "Logged out successfully"});
}