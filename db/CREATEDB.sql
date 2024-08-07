-- Drop the database if it exists
DROP DATABASE IF EXISTS fetch_db;

-- Create a new database
CREATE DATABASE fetch_db;

-- Connect to the newly created database
\connect fetch_db

CREATE TABLE UserObj (
    ID SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    aboutMe VARCHAR(255),
    picture bytea,
    githubUrl VARCHAR(255)
);

CREATE TABLE Post (
    ID SERIAL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    Title VARCHAR(50),
    Description VARCHAR(255),
    Code bytea,
    Stylesheet bytea,
    CONSTRAINT Post_FK FOREIGN KEY (UserID) REFERENCES UserObj(ID)
);

CREATE TABLE "Like" (
    ID SERIAL PRIMARY KEY,
    PostID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    CONSTRAINT Like_FK FOREIGN KEY (PostID) REFERENCES Post(ID),
    CONSTRAINT Like_FK2 FOREIGN KEY (UserID) REFERENCES UserObj(ID)
);

CREATE TABLE UserFollowingRelationship (
    ID SERIAL PRIMARY KEY,
    FollowerID INTEGER NOT NULL,
    FollowingID INTEGER NOT NULL,
    CONSTRAINT UserFollowingRelationship_FK FOREIGN KEY (FollowerID) REFERENCES UserObj(ID),
    CONSTRAINT UserFollowingRelationship_FK2 FOREIGN KEY (FollowingID) REFERENCES UserObj(ID)
);

CREATE TABLE Comment (
    ID SERIAL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    PostID INTEGER NOT NULL,
    Text VARCHAR(150),
    CONSTRAINT Comment_FK FOREIGN KEY (PostID) REFERENCES Post(ID),
    CONSTRAINT Comment_FK2 FOREIGN KEY (UserID) REFERENCES UserObj(ID)
);