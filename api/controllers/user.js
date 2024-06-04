import UserInfo from '../models/UserInfo.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createError } from '../utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//사용자 정보 수정
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (req.file) {
            const imgPath = req.file.path.replace(/\\/g, "/");

            // Find user
            const user = await UserInfo.findById(userId);
            if (!user) {
                return next(createError(404, "User not found"));
            }

            // Delete old profile image if it exists
            if (user.profile) {
                const oldImage = path.join(__dirname, '../', user.profile);
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage);
                }
            }

            // Set new profile image path
            updateData.profile = `/uploads/${req.file.filename}`;
        }

        // Update user information
        const updatedUser = await UserInfo.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await UserInfo.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

//사용자 정보 조회
export const getUser = async (req, res, next) => {
    try {
        const user = await UserInfo.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await UserInfo.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
