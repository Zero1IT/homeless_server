const {Model, DataTypes} = require("sequelize");
const info = require("../../../bin/config").getModelInfo();

class Advert extends Model {

    static initializeModel(sequelize) {
        Advert.init({
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            images: {
                type: DataTypes.STRING, // save as url1;url2;url3 (join by ';')
            },
            text: {
                type: DataTypes.STRING(300),
                defaultValue: "",
            },
            animalType: {
                type: DataTypes.ENUM,
                values: info.adverts.animalTypes,
                allowNull: false,
            },
            likeCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            idDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            charset: "utf8",
            modelName: "advert",
        });
        return Advert;
    }
}

module.exports = Advert;