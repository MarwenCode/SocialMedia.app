import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import multer from "multer";
import path from 'path';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js"



const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongoDB")
        
    } catch (error) {
        throw error;
        
    }
}

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/comments", commentRoute);


app.listen(5500, () => {
    connect();
    console.log("connected to backend")
})