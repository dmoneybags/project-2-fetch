const express = require("express");
const router = express.Router();
const path = require('path');
const crud = require('../db/CRUDoperations');

router.get("/", async (req, res) => {
    //const decoded = await verifyToken(req);
    //if (!decoded){
        //res.redirect("/signup");
    //}
    const postObj = await crud.readPosts();
    const data = {Posts: postObj, StringPosts: JSON.stringify(postObj)};
    res.render("index.handlebars", {
        layout: 'main',
        ...data 
    });
});
router.get("/createPost", async (req, res) => {
    //const decoded = await verifyToken(req);
    //if (!decoded){
        //res.redirect("/signup");
    //}
    res.render("createPost.handlebars", {
        layout: 'main'
    });
});
router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await crud.readUser(userId);
    const posts = await crud.readUserPosts(userId);
    console.log(user);
    //TO DO: calculate isSelf and isFollowing
    const data = {User: user, Posts: posts, isSomeoneElse: true, isFollowing: false};
    console.log(data);
    res.render("myaccount.handlebars", {
        layout: 'main',
        ...data
    });
})

module.exports = router;