/**
 * Help functions for controllers
 */

/**
 *
 * @param req
 * @param resp
 * @param params
 * @returns {{}|null}
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
 *
 * @param req
 * @param resp
 * @param params
 * @returns {boolean}
 */
function isBodyParamsExists(req, resp, ...params) {
    if (Object.keys(req.body).length !== 0) {
        for (let param of params) {
            if (!req.body[param]) {
                resp.status(400).send(`Invalid request. Body param ${param} doesn't provided`);
                return false;
            }
        }
        return true;
    }

    resp.status(400).send("Invalid request. Body is empty");
    return false;
}

module.exports = {
    ejectQueryParams,
    isBodyParamsExists
};