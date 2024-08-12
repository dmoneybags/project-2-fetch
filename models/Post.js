const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('Post', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserObj',
            key: 'ID'
        }
    },
    Title: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Code: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    Stylesheet: {
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    tableName: 'Post',
    timestamps: false
});

module.exports = Post;