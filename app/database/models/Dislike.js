const {Model, DataTypes} = require("sequelize");

class Dislike extends Model {

    static initializeModel(sequelize) {
        Dislike.init({
        }, {
            indexes: [
                {
                    unique: false,
                    fields: ["userId"]
                },
                {
                    unique: false,
                    fields: ["advertId"]
                }
            ],
            sequelize,
            charset: "utf8",
            timestamps: false,
            modelName: "dislike",
        });
        return Dislike;
    }
}

module.exports = Dislike;