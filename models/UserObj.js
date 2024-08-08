const {sequelize} = require('../config/connection');
const { DataTypes } = require('sequelize');

const UserObj = sequelize.define('UserObj', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    aboutMe: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    picture: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    githubUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'UserObj',
    timestamps: false
});

module.exports = UserObj;