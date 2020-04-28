const jwt = require('jsonwebtoken');
const config = require("../bin/config").getServerConfiguration();
const bcrypt = require("bcrypt");
const UserService = require("./services/UserService");
const uService = new UserService();

// TODO: future
const PERMISSIONS = {
    DEVELOPER: 10,
    MODERATOR: 8,
    USER: 0
};

/**
 * Create password hash
 * @param password
 * @returns {string}
 */
function hashPassword(password) {
    return bcrypt.hash(password, Number(config.hash_salt));
}

/**
 * Check request for authorization token
 * @param req - request
 * @param resp - response
 * @param next - next handler
 * @returns {*} - exit function
 */
function authMiddleware(req, resp, next) {
    const auth = req.headers["x-access-token"] || req.headers["authorization"];
    if (!auth) {
        return resp.status(401).end("Access denied. No token provided.");
    }
    try {
        const token = auth.split(" ")[1]; // auth format: "Bearer TOKEN_HASH"
        req.user = jwt.verify(token, config.private_key);
        next();
    } catch (e) {
        resp.status(400).end("Invalid token.");
    }
}

async function emailMiddleware(req, resp, next) {
    if (req.user) {
        const user = await uService.get(uService.searchFields.ID, req.user.id);
        if (!user.emailIsConfirm) {
            resp.status(403).end("Email is not confirmed");
        } else {
            next();
        }
    } else {
        resp.status(401).end("Unauthorized");
    }
}

module.exports = {
    authMiddleware,
    emailMiddleware,
    hashPassword,
};