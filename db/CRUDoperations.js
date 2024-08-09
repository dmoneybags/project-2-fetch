const {sequelize} = require('../config/connection');
const { Op, fn, col } = require('sequelize');
require('../models');
const { Comment, Like, Post, UserFollowingRelationship, UserObj } = require('../models');

function deserializePost(post){
    const decoder = new TextDecoder();
    post["Code"] = decoder.decode(post["Code"]);
    post["Stylesheet"] = decoder.decode(post["Stylesheet"]);
    return post;
}

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
        const _ = await UserObj.destroy({
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
async function readUserByEmail(email){
    try {
        const user = await UserObj.findOne({
            where: {email: email}
        });
        console.log("Read user of: ");
        console.log(user);
        return user ? user.toJSON() : null
    } catch (error){

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
        const posts = await Post.findAll({
            attributes: [
                'ID',
                'Title',
                'Description',
                'Code',
                'Stylesheet',
                [fn('COUNT', col('Likes.ID')), 'likeCount']
            ],
            include: [{
                model: UserObj
              },
              {
                model: Like,
                attributes: []
              },
              {
                  model: Comment
              }],
              group: ['Post.ID', 'Post.Title', 'Post.Description', 
                'Post.Code', 'Post.Stylesheet', 'UserObj.ID', 'Comments.ID']
        });
        console.log(posts);
        const desrializedPosts = posts.map(deserializePost);
        return desrializedPosts;
    } catch (error){
        console.log("Recieved error of " + error + " trying to read user");
        throw new Error(error);
    }
}
async function readFollowingPosts(userId){
    const followingIds = await readFollowingIds(userId);
    try {
        const posts = await Post.findAll({
            attributes: [
                'ID',
                'Title',
                'Description',
                'Code',
                'Stylesheet',
                [fn('COUNT', col('Likes.ID')), 'likeCount']
            ],
            where: {
                UserId: {
                  [Op.in]: followingIds
                }
            },
            include: [{
                model: UserObj
            },
            {
                model: Comment
            }]
        });
        const desrializedPosts = posts.map(deserializePost);
        return desrializedPosts;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to following posts");
        throw new Error(error);
    }
}
//Only grabs the ids not the users
async function readFollowingIds(userId){
    try {
        const followers = await UserFollowingRelationship.findAll({
            attributes: ['FollowingID'],
            where: {
                FollowerID: userId
            }
        })
        const followingIds = followers.map(follower => follower.FollowingID);
        return followingIds;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to following ids");
        throw new Error(error);
    }
}
async function addLike(userId, postId){
    try {
        const likeData = {
            UserId: userId,
            PostId: postId
        }
        const like = await Like.create(likeData);
        console.log("Sucessfully added like returning json below:")
        console.log(like);
        return like;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to add a like");
        throw new Error(error);
    }
}
async function deleteLike(userId, postId) {
    const condition1 = { UserID: userId };
    const condition2 = { PostId: postId };
    try {
        const _ = Like.destroy({
            where: {
                [Op.and]: [condition1, condition2]
            }
        })
        console.log("Removed like.")
    } catch (error) {
        console.log("Recieved error of " + error + " trying to delete a like");
        throw new Error(error);
    }
}
async function addComment(commentData) {
    try {
        const comment = await Comment.create(commentData);
        console.log("Sucessfully added comment returning json below:")
        console.log(comment);
        return comment;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to add comment");
        throw new Error("Invalid data");
    }   
}
async function deleteComment(commentId) {
    try {
        const _ = await Comment.destroy({
            where: { ID: commentId}
        });
    } catch (error) {
        console.log("Recieved error of " + error + " trying to delete comment");
        throw new Error(error);
    }
}
async function addFollowing(followerId, followingId){
    try {
        const relationshipData = {
            FollowerId: followerId,
            FollowingID: followingId
        }
        const createdRelationship = await UserFollowingRelationship.create(relationshipData);
        console.log("Sucessfully added following returning json below:")
        console.log(createdRelationship);
        return createdRelationship;
    } catch (error) {
        console.log("Recieved error of " + error + " trying to add a following");
        throw new Error(error);
    }
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    readUser,
    readUserByEmail,
    createPost,
    deletePost,
    updatePost,
    readPosts,
    readFollowingPosts,
    readFollowingIds,
    addLike,
    deleteLike,
    addComment,
    deleteComment,
    addFollowing
}