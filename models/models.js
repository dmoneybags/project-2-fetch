const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/connection');

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
            model: UserObj,
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
            model: UserObj,
            key: 'ID'
        }
    },
    FollowingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserObj,
            key: 'ID'
        }
    }
}, {
    tableName: 'UserFollowingRelationship',
    timestamps: false
});

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

module.exports = {
    UserObj,
    Post,
    Like,
    UserFollowingRelationship,
    Comment
};