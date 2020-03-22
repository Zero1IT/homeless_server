const db = require("../database/db");
const Advert = db.Advert;

class AdvertService {

    /**
     * Advert published by user with id = userId
     * @param userId - user id
     * @returns {Promise<Advert[]>} - promise with result as list of adverts
     */
    getAdvertsByUser(userId) {
        return Advert.findAll({where: {userId}});
    }

    /**
     * Find adverts which not present in likes and dislikes table with `userId`
     * @param userId - user id
     * @param limit - max count of adverts
     * @returns {Promise<Advert[]>} - promise with result as array of found adverts
     */
    advertsNotPresentInLikeDislikeByUser(userId, limit = 20) {
        return db.executeRawQuery(`call searchNotWatched(${userId}, ${limit})`, {
            model: Advert,
            mapToModel: true
        });
    }

    /**
     * List of users whose liked advert with 'advertId'
     * @param advertId - advert id
     */
    async likedUsers(advertId) {
        const advert = await Advert.findOne({where: {id: advertId}});
        if (advertId) {
            return await advert.getLikeUsers();
        }
        return null;
    }

    /**
     * Create advert and save to database
     * @param advert - advert object
     * @returns {Promise<Advert>} - promise with result as crated advert
     */
    create(advert) {
        return Advert.create(advert);
    }

    /**
     * Get adverts by id, if id is undefined return all adverts
     * @param id
     * @param limit - limit of returned adverts
     * @returns {Promise<Advert | null>|Promise<Advert[]>}
     */
    get(id, limit = 20) {
        if (id) {
            return Advert.findOne({where: {id}});
        } else {
            limit = limit > 20 ? 20 : limit;
            return Advert.findAll({limit});
        }
    }

    /**
     * Update advert by id
     * @param id
     * @param advert
     * @returns {Promise<Advert|null|Advert[]>}
     */
    async update(id, advert) {
        const [updated] = await Advert.update(advert, {where: {id}});
        if (updated) {
            return this.get(id);
        }
    }

    /**
     * Delete advert by id
     * @param id
     * @returns {Promise<boolean>} - true if deleted, otherwise false
     */
    async delete(id) {
        const deleted = await Advert.destroy({where: {id}});
        return !!deleted;
    }
}

module.exports = AdvertService;