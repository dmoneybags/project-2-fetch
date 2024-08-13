const router = require("express").Router();
const express = require('express');
const crud = require('../../db/CRUDoperations');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('./verifyToken');

const DEBUG = true;

router.post("/createPost", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        return res.status(401).json({ message: "INVALID TOKEN"});
    }
    console.log("Recieved request to create post")
    const requestBody = req.body;
    const postData = requestBody["post"];
    postData["UserID"] = decoded["userId"];
    const encoder = new TextEncoder();
    const codeBytes = Array.from(encoder.encode(postData["Code"]));
    console.log(codeBytes);
    postData["Code"] = codeBytes;
    const styleSheetBytes = Array.from(encoder.encode(postData["Stylesheet"]));
    console.log(styleSheetBytes);
    postData["Stylesheet"] = styleSheetBytes;
    const createdPost = await crud.createPost(postData);
    return res.status(200).json(createdPost);
})
router.post("/deletePost", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        return res.status(401).json({ message: "INVALID TOKEN"});
    }
    console.log("Recieved request to create post")
    const requestBody = req.body;
    const postId = requestBody["id"];
    await crud.deletePost(postId);
    return res.status(200).json({message: "deleted post"});
})
router.post("/addLike", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        return res.status(401).json({ message: "INVALID TOKEN"});
    }
    console.log("Recieved request to add like");
    const requestBody = req.body;
    const likeData = requestBody["like"];
    likeData["userId"] = decoded["userId"];
    const createdLike = await crud.addLike(likeData["userId"], likeData["postId"]);
    return res.status(200).json({ message: "Like created", post: createdLike.toJSON()});
})
router.post("/addComment", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        return res.status(401).json({ message: "INVALID TOKEN"});
    }
    console.log("Recieved request to add comment");
    const requestBody = req.body;
    const commentData = requestBody["comment"];
    commentData["UserId"] = decoded["userId"];
    const createdComment = await crud.addComment(commentData);
    return res.status(200).json({ message: "comment created", post: createdComment.toJSON()});
})
router.post("/addFollower", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        return res.status(401).json({ message: "INVALID TOKEN"});
    }
    console.log("Recieved request to add follower");
    const followerData = req.body;
    followerData["followerId"] = decoded["userId"];
    console.log(followerData);
    const createRelationship = await crud.addFollowing(followerData["followerId"], followerData["followingId"]);
    return res.status(200).json({ message: "Created following relationship", post: createRelationship.toJSON()});
})
router.post("/removeFollower", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: "INVALID TOKEN" });
    }
    console.log("Received request to remove follower");
    const followerData = req.body;
    followerData["followerId"] = decoded["userId"];
    const deleteRelationship = await crud.removeFollowing(followerData["followerId"], followerData["followingId"]);
    return res.status(200).json({ message: "Removed following relationship", post: deleteRelationship });
});
router.get("/readAllPosts", async (req, res) => {
    console.log("Recieved request to read all posts");
    const posts = await crud.readPosts();
    return res.status(200).json({ message: "Sucessfully read posts", post: posts});
})
router.get("/readFollowingPosts", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        return res.status(401).json({ message: "INVALID TOKEN"});
    }
    console.log("Recieved request to read following posts");
    const posts = await crud.readFollowingPosts(decoded["userId"]);
    return res.status(200).json({ message: "Sucessfully read posts", post: posts.toJSON()});
})

module.exports = router;