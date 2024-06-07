import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from 'morgan';

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import musicRoute from "./routes/music.js";

const app = express();
dotenv.config();

// MongoDB 연결 함수
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

// 클라이언트로부터 전송된 쿠키를 파싱하여 req.cookies 객체에 저장
app.use(cookieParser());

// JSON 요청 본문 파싱
app.use(express.json());

// CORS 정책 설정
const corsOptions = {
    origin: ['http://localhost:3000','http://192.168.0.236:3000','http://3.35.8.101:3000','http://kangminjun.xyz:3000/'], 
    credentials: true,
};
app.use(cors(corsOptions));

// 로그 기록
app.use(morgan('combined'));


// 라우팅
app.use("/api/auth", authRoute);
app.use("/api/userinfo", userRoute);
app.use("/api/musicinfo", musicRoute);

// 전역 오류 처리를 위한 코드
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// MongoDB 연결 해제 이벤트 핸들러
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

// 서버 시작 및 MongoDB 연결 시도
app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to backend.");
});
