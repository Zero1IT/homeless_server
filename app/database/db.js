const {Sequelize} = require("sequelize");
const debug = require("debug")("pethome:db - ");
const setup = require("../../bin/config").getServerConfiguration();
const sequelize = new Sequelize(setup.db_name, setup.db_login, setup.db_password, {dialect: "mysql"});

const User = require("./models/User").initializeModel(sequelize);
const Advert = require("./models/Advert").initializeModel(sequelize);
const Like = require("./models/Like").initializeModel(sequelize);
const Dislike = require("./models/Dislike").initializeModel(sequelize);

User.hasMany(Advert);
User.belongsToMany(Advert, {through: Like, as: {plural: "likeAdverts"}});
Advert.belongsToMany(User, {through: Like, as: {plural: "likeUsers"}});
User.belongsToMany(Advert, {through: Dislike, as: {plural: "dislikeAdverts"}});
Advert.belongsToMany(User, {through: Dislike, as: {plural: "dislikeUsers"}});

// do sync and test data inserting
sequelize.sync({force: true}).then(async () => {
    require("../../w_tests").randomDataSet();
});

function checkDatabaseConnection() {
    sequelize.authenticate()
        .then(() => debug("Database is connected!"))
        .catch(e => debug("Error: " + e.message));
}

/**
 * Executing raw query
 * @param query - query string
 * @param options - sequelize options
 * @returns {Promise<any>} - promise with result
 */
function executeRawQuery(query, options) {
    return sequelize.query(query, options);
}

module.exports = {
    Advert,
    User,
    Like,
    Dislike,
    checkDatabaseConnection,
    executeRawQuery
};
