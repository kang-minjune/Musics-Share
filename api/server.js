import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import musicRoute from "./routes/music.js";

// import path from 'path';
// import { fileURLToPath } from 'url';
import morgan from 'morgan';



const app = express() //Express 애플리케이션 인스턴스 생성
dotenv.config();//환경 변수 로드

//MongoDB 연결 함수
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch(error){
        throw error;
    }
};

//클라이언트로부터 전송된 쿠키를 파싱하여 req.cookies 객체에 저장합니다.
app.use(cookieParser());
// JSON 요청 본문 파싱
app.use(express.json());

// ‘http://localhost:3000' 접근을 CORS 정책을 적용하여 자격 증명을 포함한 요청도 허용하도록 설정
//이는 주로 프론트엔드 애플리케이션이 백엔드 서버에 안전하게 접근할 수 있도록 도와준다
const corsOptions = {
    //외부에서 접근하려면 여기에 추가해야함.(IP주소 바뀔때마다)
    origin: ['http://localhost:3000','http://192.168.0.236:3000'], 
    credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan('combined'));

app.use("/api/auth", authRoute);
app.use("/api/userinfo", userRoute);
app.use("/api/musicinfo", musicRoute);




//전역 오류 처리를 위한 코드
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

//MongoDB 연결 해제 이벤트 핸들러
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//서버 시작 및 MongoDB 연결 시도
app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to backend.");
})