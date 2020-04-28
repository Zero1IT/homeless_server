const Sequelize = require("sequelize");

/**
 * Help functions for controllers
 */

/**
 * Ejects params from query, if at least one of params doesn't provided return null
 * @param req - current request
 * @param resp - current response
 * @param params - params which should be provided in request
 * @returns {{}|null} - object with provided params, or null
 */
function ejectQueryParams(req, resp, ... params) {
    let result = {};
    for (let param of params) {
        if (!req.params[param] && !req.query[param]) {
            resp.status(400).send(`Invalid request. Url param ${param} doesn't provided`);
            return null;
        } else {
            result[param] = req.params[param] || req.query[param];
        }
    }
    return result;
}

/**
 * @param req - current request
 * @param resp - current response
 * @param params - params which should be provided in body
 * @returns {boolean} - true if params provided, otherwise false
 */
function isBodyParamsExists(req, resp, ...params) {
    if (Object.keys(req.body).length !== 0) {
        let params2 = Array.isArray(params[0]) ? params[0] : params;
        for (let param of params2) {
            if (!req.body[param]) {
                resp.status(400).end(`Invalid request. Body param ${param} doesn't provided`);
                return false;
            }
        }
        return true;
    }

    resp.status(400).end("Invalid request. Body is empty");
    return false;
}

function sendError(resp, e) {
    if (e instanceof Sequelize.ValidationError) {
        resp.status(400).end(`${e.errors[0].value} ${e.errors[0].message}`);
    } else {
        resp.status(500).end("Invalid status, timestamp: " + new Date().toTimeString());
        console.log(e.message);
    }
}

module.exports = {
    ejectQueryParams,
    isBodyParamsExists,
    sendError,
};