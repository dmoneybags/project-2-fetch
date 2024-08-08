const router = require("express").Router();
const express = require('express');
const app = express();
const crud = require('../../db/CRUDoperations');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
require('dotenv').config();

const jwtVerifyAsync = promisify(jwt.verify)

// Middleware to parse JSON request body
app.use(express.json());

const { User } = require("../models");

//Passwords should already be hashed at this point
router.post("/register", async (req, res) => {
    console.log("Recieved request to register")
    const requestBody = req.body;
    const userData = requestBody["user"];
    if (!readUserByEmail(email)){
        return res.status(409).json({ error: 'User already exists' });
    }
    const user = crud.createUser(userData);
    console.log("User created!");
    //CREATE TOKEN
    const token = jwt.sign({userId: user.ID}, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: "User registered", user: user.toJSON()})
})
router.post("/login", async (req, res) => {
    console.log("Recieved request to login");
    const requestBody = req.body;
    const email = requestBody["email"];
    const password = requestBody["password"];
    const user = readUserByEmail(email);
    if (!user){
        return res.status(401).json({ error: 'Username or password does not match' });
    }
    const validPassword = bcrypt.compareSync(
        password,
        user.password
    );
    if (!validPassword) {
        res.status(401).json({ error: "Username or password does not match" });
        return;
    }
    console.log("User logged in!");
    //CREATE TOKEN
    const token = jwt.sign({userId: user.ID}, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: "User logged in", user: user.toJSON(), token: token})
});

module.exports = router;