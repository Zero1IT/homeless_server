const jwt = require('jsonwebtoken');
const config = require("../bin/config").getServerConfiguration();
const bcrypt = require("bcrypt");

const PERMISSIONS = {
    DEVELOPER: 10,
    MODERATOR: 8,
    USER: 0
};

/**
 *
 * @param password
 * @returns {string}
 */
function hashPassword(password) {
    return bcrypt.hash(password, Number(config.hash_salt));
}

function authMiddleware(req, resp, next) {
    const auth = req.headers["x-access-token"] || req.headers["authorization"];
    if (!auth) {
        return resp.status(401).send("Access denied. No token provided.");
    }
    try {
        const token = auth.split(" ")[1]; // auth format: [Bearer TOKEN]
        req.user = jwt.verify(token, config.private_key);
        next();
    } catch (e) {
        resp.status(400).send("Invalid token.");
    }
}

module.exports = {
    authMiddleware,
    hashPassword,
};