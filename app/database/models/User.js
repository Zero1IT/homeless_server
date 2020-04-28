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
                validate: {
                    is: {
                        args: /^\+\d+$/,
                        msg: "is not valid phone number",
                    }
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "is not valid email address"
                    }
                },
            },
            emailIsConfirm: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            permissionLevel: {
                type: DataTypes.TINYINT,
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