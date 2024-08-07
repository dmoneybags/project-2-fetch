const {sequelize} = require('../config/connection');
const { UserObj, Post, Like, UserFollowingRelationship, Comment } = require('../models/models');

async function createUser(userData) {
    try {
        const user = await UserObj.create(userData);
        console.log("Sucessfully added user returning json below:")
        console.log(user);
        return user;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to add user");
        throw new Error("Invalid data");
    }   
}
async function deleteUser(userId) {
    try {
        const result = await UserObj.destroy({
            where: { ID: userId}
        });
    } catch (error) {
        console.log("Recieved error of " + error + " trying to delete user");
        throw new Error(error);
    }
}
async function updateUser(userId, updatedValues) {
    try {
        const _ = await UserObj.update(updatedValues, {
            where: { ID: userId}
        })
        console.log("Successfully upated user")
    } catch (error) {
        console.log("Recieved error of " + error + " trying to update user");
        throw new Error("Invalid Data");
    }
}
async function readUser(userId){
    try {
        const user = await UserObj.findByPk(userId);
        console.log("Read user of: ");
        console.log(user);
        return user ? user.toJSON() : null
    } catch (error){
        console.log("Recieved error of " + error + " trying to read user");
        throw new Error(error);
    }
}
async function createPost(postData) {
    try {
        const post = await Post.create(postData);
        console.log("Sucessfully added post returning json below:")
        console.log(post);
        return post;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to add post");
        throw new Error("Invalid data");
    }
}
async function deletePost(postId) {
    try {
        const result = await Post.destroy({
            where: { ID: postId}
        });
    } catch (error) {
        console.log("Recieved error of " + error + " trying to delete post");
        throw new Error(error);
    }
}
async function updatePost(postId, updatedValues) {
    try {
        const _ = await Post.update(updatedValues, {
            where: { ID: postId}
        })
        console.log("Successfully upated Post")
    } catch (error) {
        console.log("Recieved error of " + error + " trying to update Post");
        throw new Error("Invalid Data");
    }
}
async function readPosts(){
    try {
        const posts = await Post.findAll([UserObj]);
        return posts
    } catch (error){
        console.log("Recieved error of " + error + " trying to read user");
        throw new Error(error);
    }
}
async function readFollowingPosts(userId){
    try {
        const posts = await Post.findAll([UserObj]);
        return posts
    } catch (error) {
    
    }
}