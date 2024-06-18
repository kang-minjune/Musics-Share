import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token'];

    console.log(`verifying token: ${token}`)
    if(!token){
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is not valid"));
        req.user = user;
        console.log("verify 완료 후 user 정보 : " + req.user)
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next);

    if(req.user.id == req.params.userId){
        console.log("verifyUser req. user. id, req.params.userId 정보가 같을 때")
        next();
    } else{
        return next(createError(403, "You are not authorized!"));
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next)
    if(req.user.isAdmin) {
        console.log("verifyAdmin req.user.isAdmin: true")
        next();
    } else{
        return next(createError(403, "You are not authorized!"));
    }
};