const Like = require("../database/db").Like;
const Dislike = require("../database/db").Dislike;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class DislikeLikeService {

    async count(userId, model) {
        const options = {attributes: [[Sequelize.fn("COUNT", "*"), "count"]]};
        if (userId) {
            options.where = {userId};
        }
        const count = await model.findAll(options);
        return count[0].dataValues;
    }

    async toAdvert(userId, advertId, model, anyModel) {
        const set = await anyModel.findOne({
            where: {
                [Op.and]: [{userId}, {advertId}]
            }
        });
        const distinct = await model.findOne({
            where: {
                [Op.and]: [{userId}, {advertId}]
            }
        });
        return (set || distinct) ? null : model.create({userId, advertId});
    }

    /**
     * Count of user likes
     * @param userId - user id
     * @returns {Promise<Like[]>} - count as single array item
     */
    async countLikes(userId) {
        return this.count(userId, Like);
    }

    /**
     * Do like
     * @param userId - user whose sets like
     * @param advertId - liked advert
     * @returns {Promise<*>} - null if like not set, otherwise likes info sent by user
     */
    async likeToAdvert(userId, advertId) {
        return this.toAdvert(userId, advertId, Like, Dislike);
    }

    async countDislikes(userId) {
        return this.count(userId, Dislike);
    }

    async dislikeToAdvert(userId, advertId) {
        return this.toAdvert(userId, advertId, Dislike, Like);
    }

}

module.exports = DislikeLikeService;