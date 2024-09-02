const express = require('express');
const router = express.Router();

//import the controller

//const {dummyLink} = require("../controllers/LikeController"); 
const {createComment} = require("../controllers/commentController");
const {createPost,getAllPosts} = require("../controllers/PostController");
const {likePost,unlikePost} = require("../controllers/LikeController"); 

//create a mapping 
// router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);



//exporting it
module.exports = router;