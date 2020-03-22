/**
 * Returns configure object
 * @returns {{db_name: string, db_password: string, db_login: string, private_key: string, jws_alg: string, hash_salt: string}}
 */
module.exports.getServerConfiguration = function () {
    try {
        return require("../w_configure");
    } catch (e) {
        throw new Error(`File 'w_configure.json' not found in project root! Add it to your project root`)
    }
};

/**
 * Return model info object
 * @returns {{adverts: {animalTypes: *}}}
 */
module.exports.getModelInfo = function () {
    try {
        return require("../app/database/model_info");
    } catch (e) {
        throw new Error(`File 'model_info.json' not found in 'database' folder!`);
    }
};