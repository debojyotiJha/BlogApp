//importing the model

const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//defining the business logic

exports.likePost = async(req,res) =>{
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user,
        });
        const savedLike = await like.save();
        //update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{likes: savedLike._id}} , {new:true})
        .populate("likes").exec();

        res.json({
            post:updatedPost,
        })
    }
    catch(error){
        return res.status(500)
        .json({
            error:"Error While Liking the Post",
        });

    }
};


//unlike post

exports.unlikePost = async(req,res) =>{
    try{
        const {post,like} = req.body;
        //find and delete
        const deletedLike = await Post.findOneAndDelete({post:post,_id:like});

        //updating the post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes: deletedLike._id}} , {new:true});

        res.json({
            post:updatedPost,
        })

    }
    catch(error){
        return res.status(500)
        .json({
            error:"Error While unliking the Post",
        });
    }
};