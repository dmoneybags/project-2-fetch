const express = require("express");
const router = express.Router();
const path = require('path');
const crud = require('../db/CRUDoperations');
const verifyToken = require('./api/verifyToken');
router.get("/", async (req, res) => {
    const postObj = await crud.readPosts();
    const decoded = await verifyToken(req);
    const data = {Posts: postObj, StringPosts: JSON.stringify(postObj)};
    res.render("index.handlebars", {
        layout: 'main',
        loggedIn: decoded !== null,
        ...data 
    });
});
router.get("/following", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        res.redirect("/signup");
        return;
    }
    const postObj = await crud.readFollowingPosts(decoded["userId"]);
    const data = {Posts: postObj, StringPosts: JSON.stringify(postObj)};
    res.render("index.handlebars", {
        layout: 'main',
        loggedIn: true,
        ...data 
    });
});
router.get("/createPost", async (req, res) => {
    const decoded = await verifyToken(req);
    if (!decoded){
        res.redirect("/signup");
        return;
    }
    res.render("createPost.handlebars", {
        layout: 'main',
        loggedIn: true
    });
});
router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    console.log(`Loading user page with id of ${userId}`)
    const user = await crud.readUser(userId);
    const posts = await crud.readUserPosts(userId);
    console.log(user);
    const decoded = await verifyToken(req, res);
    let isSomeoneElse = true;
    let isFollowing = false;
    if (decoded){
        isSomeoneElse = userId != decoded["userId"];
        const followingIds = await crud.readFollowingIds(decoded["userId"]);
        console.log("Following Id's:");
        console.log(followingIds);
        console.log("UserID:");
        console.log(userId);
        isFollowing = followingIds.includes(Number(userId));
        console.log("isFollowing:");
        console.log(isFollowing);
    } else {
        console.log("No token provided or token could not be decoded");
    }
    const data = {User: user, Posts: posts, isSomeoneElse: true, isFollowing: isFollowing};
    console.log(data);
    res.render("myaccount.handlebars", {
        layout: 'main',
        loggedIn: decoded !== null,
        ...data
    });
})
router.get("/myAccount", async (req, res) => {
    const decoded = await verifyToken(req, res);
    if (decoded === null){
        console.log("Redirecting to login");
        res.redirect('/login');
        return;
    }
    const user = await crud.readUser(decoded["userId"]);
    const posts = await crud.readUserPosts(decoded["userId"]);
    console.log(user);
    let isSomeoneElse = false;
    let isFollowing = false;
    const data = {User: user, Posts: posts, isSomeoneElse: isSomeoneElse, isFollowing: isFollowing};
    console.log(data);
    res.render("myaccount.handlebars", {
        layout: 'main',
        loggedIn: true,
        ...data
    });
})
router.get("/login", async (req, res) => {
    res.render("login.handlebars", {
        layout: 'main'
    });
})
router.get("/signUp", async (req, res) => {
    res.render("signUp.handlebars", {
        layout: 'main'
    });
})
module.exports = router;