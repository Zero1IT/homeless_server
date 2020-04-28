const {Model, DataTypes} = require("sequelize");

class Chat extends Model {
    static initializeModel(sequelize) {
        Chat.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1
            }
        }, {
            sequelize,
            charset: "utf8",
            modelName: "chat",
            timestamps: false,
        });

        return Chat;
    }
}

module.exports = Chat;