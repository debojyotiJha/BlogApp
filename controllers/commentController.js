//import the model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//creating the business logic
exports.createComment = async(req,res) =>{
    try{
        //fetch data from req body
        const {post,user,body} = req.body;
        //create a comment object
        const comment = new Comment({
            post,user,body
        });

        //save the comment in to the database
        const savedComment = await comment.save(); 

        //find the post by id,and add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments:savedComment._id}},{new: true} )
                            .populate("comments") //populate the comments with comment documets
                            .exec();
        res.json({
            post: updatedPost,
        });                    
    }
    catch(error){
        return res.status(500).json({
            error:"Error While creating the comment",
        });

    }
};