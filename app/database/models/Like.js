const {Model, DataTypes} = require("sequelize");

class Like extends Model {

    static initializeModel(sequelize) {
        Like.init({
            accepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            watched: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
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
            modelName: "like",
        });
        return Like;
    }
}

module.exports = Like;