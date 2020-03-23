const dislikeLikeService = require("../services/services").DislikeLike;
const helper = require("./XcHelper");

class DislikeLikeController {

    async sendLikeOrDislike(req, resp, isLike = true) {
        let params = helper.ejectQueryParams(req, resp, "advertId");
        if (params) {
            const result = isLike ?
                await dislikeLikeService.likeToAdvert(req.user.id, params.advertId)
                : await dislikeLikeService.dislikeToAdvert(req.user.id, params.advertId);
            if (result) {
                resp.json(result);
            } else {
                resp.status(409).send("Duplicate operation");
            }
        }
    }

    async likeDislikeCount(req, resp, isLike = true) {
        let param = req.params.user || req.query.user;
        let dl = isLike ?
            await dislikeLikeService.countLikes(param)
            : await dislikeLikeService.countDislikes(param);
        resp.json(dl);
    }

    async sendLike(req, resp) {
        this.sendLikeOrDislike(req, resp);
    }

    async likeCount(req, resp) {
        this.likeDislikeCount(req, resp);
    }

    async dislikeCount(req, resp) {
        this.likeDislikeCount(req, resp, false);
    }

    async sendDislike(req, resp) {
        this.sendLikeOrDislike(req, resp, false);
    }
}

module.exports = DislikeLikeController;