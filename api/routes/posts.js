import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
const postRoute = express.Router()

//create a post
postRoute.post("/", async(req, res) => {
    try {
        const newPost = new Post(req.body)
        const post = await newPost.save()
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

//update a post
postRoute.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            try {
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new:true}
                );
                res.status(200).json(updatePost)
            } catch (error) {
                res.status(500).json(error)
                
            }
        }else {
            res.status(401).json("you can update only your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})

//delete a post
postRoute.delete("/:id", async(req, res) => {
    try {
        const post  = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            try {
                await post.delete()
                res.status(200).json("post has been deleted")
            } catch (error) {
                res.status(500).json(error)
                
            }

        }else {
            res.status.apply(401).json("you can delete only your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

//like && dislike a post
postRoute.put("/like/:id", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push:{likes: req.body.userId}})
            res.status(200).json("the post has been liked")
        }else {
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
        
    } catch (error) {
        res.status(500).json(err);
    }
})

//get a post
postRoute.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
        
    }
});

//get all posts
postRoute.get("/", async(req, res) => {
    try {
        const posts = await Post.find(req.body);
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json(error)
        
        
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


postRoute.get("/myposts/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const posts = await Post.find({userId: user._id})
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

export default postRoute