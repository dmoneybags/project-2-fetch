const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const UserFollowingRelationship = require("./UserFollowingRelationship");
const UserObj = require("./UserObj");

UserObj.hasMany(Post, {
    foreignKey: 'UserID'
});

Post.belongsTo(UserObj, {
    foreignKey: 'UserID'
});

Post.hasMany(Like, {
    foreignKey: 'PostID'
});

Post.hasMany(Comment, {
    foreignKey: 'PostID'
});

Like.belongsTo(Post, {
    foreignKey: 'PostID'
});

Like.belongsTo(UserObj, {
    foreignKey: 'UserID'
});

Comment.belongsTo(Post, {
    foreignKey: 'PostID'
});

Comment.belongsTo(UserObj, {
    foreignKey: 'UserID'
});

UserFollowingRelationship.belongsTo(UserObj, {
    as: 'Follower',
    foreignKey: 'FollowerID'
});

UserFollowingRelationship.belongsTo(UserObj, {
    as: 'Following',
    foreignKey: 'FollowingID'
});

module.exports = {
    Comment,
    Like,
    Post,
    UserFollowingRelationship,
    UserObj
};