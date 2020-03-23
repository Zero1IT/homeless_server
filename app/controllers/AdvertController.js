const advertService = require("../services/services").Advert;
const helper = require("./XcHelper");
const defaultAdvertsLimit = 20;

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

    createAdvert(req, resp) {
        if (Object.keys(req.body).length !== 0) {
            req.body.userId = req.user.id;
            advertService.create(req.body).then(v => resp.json(v));
        } else {
            resp.status(400).send("Body is empty");
        }
    }

    selectAdverts(req, resp) {
        let id = req.params.id || req.query.id;
        if (id) {
            advertService.get(id).then(v => resp.json(v));
        } else {
            resp.status(400).send("Url parameter 'id' not present");
        }
    }

    usersInterestedInAdvert(req, resp) {
        let id = req.params.id || req.query.id;
        if (id) {
            advertService.likedUsers(id, req.user.id).then(v => resp.json(v));
        } else {
            resp.status(400).send("Url parameter 'id' not present");
        }
    }

    updateAdvert(req, resp) {
        let id = req.params.id || req.query.id;
        if (id) {
            if (Object.keys(req.body).length !== 0) {
                advertService.update(id, req.body).then(v => resp.json(v));
            } else {
                resp.status(400).send("Body is empty");
            }
        } else {
            resp.status(400).send("Url parameter 'id' not present");
        }
    }

    deleteAdvert(req, resp) {
        let id = req.params.id || req.query.id;
        if (id) {
            advertService.delete(id).then(v => resp.json({deleted: v}));
        } else {
            resp.status(400).send("Url parameter 'id' not present");
        }
    }
}

module.exports = AdvertController;