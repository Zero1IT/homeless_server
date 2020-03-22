const Like = require("../database/db").Like;
const sequelize = require("sequelize");
const Op = sequelize.Op;

class LikeService {

    /**
     * Count of user likes
     * @param userId - user id
     * @returns {Promise<Like[]>} - count as single array item
     */
    async countLikes(userId) {
        const options = {attributes: [[sequelize.fn("COUNT", "*"), "count"]]};
        if (userId) {
            options.where = {userId};
        }
        const count = await Like.findAll(options);
        return count[0].dataValues;
    }

    /**
     * Do like
     * @param userId - user whose sets like
     * @param advertId - liked advert
     * @returns {Promise<*>} - null if like not set, otherwise likes info sent by user
     */
    async likeToPost(userId, advertId) {
        const distinct = await Like.findAll({
            attributes: [[sequelize.fn("COUNT", "*"), "count"]],
            where: {
                [Op.and]: [{userId}, {advertId}]
            }
        });
        let distinctCount = distinct[0].dataValues.count;
        return distinctCount > 0 ? null : Like.create({userId, advertId});
    }
}

module.exports = LikeService;