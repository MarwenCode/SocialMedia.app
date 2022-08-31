import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
const postRoute = express.Router();

//create a post
postRoute.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a post
postRoute.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a post
postRoute.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        await post.deleteOne();
        res.status(200).json("post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//like && dislike a post
postRoute.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

//get a post
postRoute.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts
postRoute.get("/", async (req, res) => {
  try {
    const posts = await Post.find(req.body).populate("comments").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Second way to get all posts
// postRoute.get("/", async (req, res) => {
//     const users = req.body.userId;
//     try {
//       let posts;
//       if (users) {
//         posts = await Post.find({ users });
//       } else {
//         posts = await Post.find();
//       }
//       res.status(200).json(posts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//get my own posts

postRoute.get("/myposts/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ userId: user._id })
      .populate("comments")
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// postRoute.get("/profile/friend/:id", async(req, res) => {

//   try {
//     const user = await User.findById(req.params.id);
//     const posts = await Post.find({ userId: user._id })
//       .populate("comments")
//       .exec();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json(error);
//   }

// })

// postRoute.get("/timeline/:userId", async (req, res) => {
//     try {
//       const currentUser = await User.findById(req.params.userId);
//       const posts = await Post.find({ userId: currentUser._id}).populate("comments").exec()
//         // console.log(err);
//         // console.log(data)

//     //   const userPosts = await Post.find({ userId: currentUser._id });
//     //   const friendPosts = await Promise.all(
//     //     currentUser.followings.map((friendId) => {
//     //       return Post.find({ userId: friendId });
//     //     })
//     //   );
//       // res.status(200).json(posts.concat(...friendPosts));
//       res.status(200).json(posts)
//       console.log(posts)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// postRoute.get("/myposts/:userId", async(req, res) => {
//     try {
//         const currentUser = await User.findById(req.params.userId);
//         const posts = await Post.find({ userId: currentUser._id}).populate("comments")
//         console.log(posts.comments)

//         res.status(200).json(posts)
//         console.log(posts)
//       } catch (err) {
//         res.status(500).json(err);
//       }
// })

//get user's all posts

// postRoute.get("/profile/:userId", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.userId);
//       const posts = await Post.find({ userId: user._id }).populate("comments").exec(function (err, data) {
//         console.log(err);
//         console.log(data)
//       });
//       res.status(200).json(posts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//get all posts

postRoute.get("/", async (req, res) => {
  try {
    await User.find();
    const post = await Post.find().populate("comments").exec();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//add comment
// postRoute.patch('/comment-post/:id', async(req, res) => {
//     // if (!ObjectID.isValid(req.params.id))
//     // return res.status(400).send("ID unknown : " + req.params.id);

//   try {
//      Post.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: {
//           comments: {
//             commenterId: req.body.commenterId,
//             commenterPseudo: req.body.commenterPseudo,
//             text: req.body.text,
//             timestamp: new Date().getTime(),
//           },
//         },
//       },
//       { new: true },
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         else return res.status(400).send(err);
//       }
//     );
//   } catch (err) {
//     return res.status(400).send(err);
//   }

//   })

export default postRoute;
