const {sequelize} = require('../config/connection');
const { DataTypes } = require('sequelize');

const Like = sequelize.define('Like', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    PostID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'ID'
        }
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserObj,
            key: 'ID'
        }
    }
}, {
    tableName: 'Like',
    timestamps: false
});

module.exports = Like;