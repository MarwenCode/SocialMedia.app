import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import multer from "multer";
import path from 'path';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import profilefriendRoute from "./routes/friendsprofile.js"
import { fileURLToPath } from "url";



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

//upload pic 

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log("images", __dirname);

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


  app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/comments", commentRoute);
app.use("/api/profile", profilefriendRoute);



app.listen(5500, () => {
    connect();
    console.log("connected to backend")
})