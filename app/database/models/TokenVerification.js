const {Model, DataTypes} = require("sequelize");

class TokenVerification extends Model {
    static initializeModel(sequelize) {
        TokenVerification.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            charset: "utf8",
            modelName: "tokenVerification",
        });

        return TokenVerification;
    }
}

module.exports = TokenVerification;