import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
const commentRoute = express.Router()


//create new comment

commentRoute.post("/:postId", async(req, res) => {
   
    try {
        const newComment = await new Comment({ ...req.body, PostId: req.params.postId});
          const savedComment = await newComment.save();
         
          res.status(200).json(savedComment)
       
          
      } catch(error) {
          res.status(500).json(error)
          
      }
      console.log(req.body)  
})

// commentRoute.post("/:postId", async(req, res) => {
//   try {
//     return Post.findByIdAndUpdate(
//       req.params.id,
//       {$push: {
//         comment: {
//           commenterId: req.body.commenterId,
//           username: req.body.username,
//           text: req.body.text,
//           timestamp: new Date().getTime(),
//         }
//       }},
//     {new:true})
    
//   } catch (error) {
    
//   }
   
// })



//get all comments post 

commentRoute.get("/:postId", async (req, res) => {
    try {
      const comments = await Comment.find({
          commentId: req.params.postId
      });
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  
  
  
  
  //get comments
  
  // commentRoute.get("/:commentId", async (req, res) => {
  //   try {
  //     const comments = await Comment.find({
  //         commentId: req.params.commentId
  //     });
  
  //     res.status(200).json(comments);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // });

export default commentRoute
