const advertService = require("../services/services").Advert;
const helper = require("./XcHelper");
const defaultAdvertsLimit = 20;
const advertRequiredParams = ["title", "animalType"];

class AdvertController {

    usersAdverts(req, resp) {
        advertService.getAdvertsByUser(req.user.id).then(v => resp.json(v));
    }

    notWatchedAdverts(req, resp) {
        let params = helper.ejectQueryParams(req, resp, "limit");
        params.limit = params.limit ? params.limit : defaultAdvertsLimit;
        advertService.advertsNotPresentInLikeDislikeByUser(req.user.id, params.limit)
            .then(adverts => resp.json(adverts));
    }

    async createAdvert(req, resp) {
        if (helper.isBodyParamsExists(req, resp, advertRequiredParams)) {
            req.body.userId = req.user.id;
            try {
                let result = await advertService.create(req.body);
                resp.json(result);
            } catch (e) {
                helper.sendError(resp, e);
            }
        }
    }

    selectAdverts(req, resp) {
        let id = req.params.id || req.query.id;
        advertService.get(id).then(v => resp.json(v));
    }

    usersInterestedInAdvert(req, resp) {
        let params = helper.ejectQueryParams(req, resp, "id");
        if (params) {
            advertService.likedUsers(params.id, req.user.id).then(v => resp.json(v));
        }
    }

    updateAdvert(req, resp) {
        let params = helper.ejectQueryParams(req, resp, "id");
        if (params) {
            if (helper.isBodyParamsExists(req, resp)) {
                advertService.update(params.id, req.body).then(v => resp.json(v));
            }
        }
    }

    deleteAdvert(req, resp) {
        let params = helper.ejectQueryParams(req, resp, "id");
        if (params) {
            advertService.delete(params.id).then(v => resp.json({deleted: v}));
        }
    }
}

module.exports = AdvertController;