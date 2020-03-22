const {Model, DataTypes} = require("sequelize");
const jwt = require('jsonwebtoken');
const config = require("../../../bin/config").getServerConfiguration();

class User extends Model {

    generateAuthToken() {
        return jwt.sign({id: this.id},
            config.private_key, {algorithm: config.jws_alg});
    }

    static initializeModel(sequelize) {
        User.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            emailIsConfirm: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            countNotWatchedLikes: {
                type: DataTypes.SMALLINT,
                defaultValue: 0,
                allowNull: false,
            },
        }, {
            sequelize,
            charset: "utf8",
            modelName: "user"
        });
        return User;
    }
}

module.exports = User;