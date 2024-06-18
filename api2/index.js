import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import morgan from 'morgan';
import mysql from 'mysql2'
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/auth.js'
import userinfosRoutes from './routes/userinfos.js'
import musicsRoutes from './routes/musics.js'

const app = express();
dotenv.config();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}
app.use(cors(corsOptions));

app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if(err){
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL syncDB database.');
    connection.release();
});

app.use('/api2/auth', authRoutes);
app.use('/api2/userinfos', userinfosRoutes);
app.use('/api2/musics', musicsRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

