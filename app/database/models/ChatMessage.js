const {Model, DataTypes} = require("sequelize");

class ChatMessage extends Model {
    static initializeModel(sequelize) {
        ChatMessage.init({
            chatId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            charset: "utf8",
            modelName: "chatMessage",
        });

        return ChatMessage;
    }
}

module.exports = ChatMessage;