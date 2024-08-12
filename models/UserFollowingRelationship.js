const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const UserFollowingRelationship = sequelize.define('UserFollowingRelationship', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FollowerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserObj',
            key: 'ID'
        }
    },
    FollowingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserObj',
            key: 'ID'
        }
    }
}, {
    tableName: 'UserFollowingRelationship',
    timestamps: false
});

module.exports = UserFollowingRelationship;