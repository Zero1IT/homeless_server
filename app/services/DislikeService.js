const Dislike = require("../database/db").Dislike;
const sequelize = require("sequelize");
const Op = sequelize.Op;

class DislikeService {

    async countDislikes(userId) {
        const options = {attributes: [[sequelize.fn("COUNT", "*"), "count"]]};
        if (userId) {
            options.where = {userId};
        }
        const count = await Dislike.findAll(options);
        return count[0].dataValues;
    }

    async dislikeToPost(userId, advertId) {
        const distinct = await Dislike.findAll({
            attributes: [[sequelize.fn("COUNT", "*"), "count"]],
            where: {
                [Op.and]: [{userId}, {advertId}]
            }
        });
        let distinctCount = distinct[0].dataValues.count;
        return distinctCount > 0 ? null : Dislike.create({userId, advertId});
    }

}

module.exports = DislikeService;