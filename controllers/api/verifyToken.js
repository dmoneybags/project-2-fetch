const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtVerifyAsync = promisify(jwt.verify);

async function verifyToken(req, res) {
    console.log("Decoding token...");
    const token = req.query.authorization;
    if (token === null || token === undefined){
        console.log("No token provided");
        return null;
    }
    try {
        const decoded = await jwtVerifyAsync(token, process.env.SECRET_KEY);
        console.log('Decoded token:', decoded);
        return decoded;
    } catch (error) {
        console.log('Token verification failed:', error);
        return null;
    }
}

module.exports = verifyToken;