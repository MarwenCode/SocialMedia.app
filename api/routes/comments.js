import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
const commentRoute = express.Router();

//create new comment

commentRoute.post("/:postId", async (req, res) => {
  try {
    const newComment = await new Comment({
      ...req.body,
      PostId: req.params.postId,
    });
    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
  console.log(req.body);
});

//delete a comment
commentRoute.delete("/:id", async (req, res) => {
  // if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment.userId === req.body.userId) {
      try {
        await comment.deleteOne();
        res.status(200).json("comment has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can delete only your comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


// update a comment

commentRoute.put("/:id", async(req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId) {
      try {
        const updateComment = await Comment.findByIdAndUpdate(
          req.params.id,
          {$set: req.body},
          {new: true}
        );
        res.status(200).json(updateComment);
      } catch (error) {
        res.status(500).json(error)
        
      }
    }else {
      res.status(401).json("you can edit only your comment")
    }

  } catch (error) {
    res.status(500).json(error);
    
  }
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

//get a comment for singlepost
//get a post
// commentRoute.get("/:id", async(req, res) => {
//   try {
//       const comment = await Comment.findById(req.params.id);
//       res.status(200).json(comment)
//   } catch (error) {
//       res.status(500).json(error)

//   }
// });

//get all comments post

commentRoute.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      commentId: req.params.postId,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});


//get a single comment
commentRoute.get("/:postId/:commentId", async(req, res) => {
  try {
    const comment = await Comment.findById({
      commentId:req.params.postId
    });
    res.status(200).json(comment)
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})




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

//   commentRoute.get("/:id", async(req, res) => {
//     try {
//         const comment = await Comment.findById(req.params.id);
//         res.status(200).json(comment)
//     } catch (error) {
//         res.status(500).json(error)

//     }
// });

//try to delete a comment

// commentRoute.delete("/deletecomment/:id", async(req, res) => {

//   try {
//     Post.findByIdAndUpdate(
//       req.params.id, {
//         $pull: {
//           comments: {
//             _id: req.body.commentId
//           }
//         }
//       },
//       {new:true }),
//        res.status(200).json("comment deleted");

//   } catch (error) {
//     return res.status(500).json(error);

//   }

// })

export default commentRoute;
