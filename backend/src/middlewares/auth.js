const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (req, res) => {
    const username = req.body.username;
    const payload = { name: username };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS512',
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return res.status(201).json({
        success: true,
        token
    });
}

const tokenCheck = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        console.log("Header is not found - [tokenCheck]");
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Token invalid - [tokenCheck]');
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { createToken, tokenCheck };
