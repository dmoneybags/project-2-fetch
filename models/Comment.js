const {sequelize} = require('../config/connection');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserObj,
            key: 'ID'
        }
    },
    PostID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'ID'
        }
    },
    Text: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
}, {
    tableName: 'Comment',
    timestamps: false
});