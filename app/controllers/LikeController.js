const likeService = require("../services/services").Like;

class LikeController {

    sendLike(req, resp) {
        let advertId = req.params.advertId || req.query.advertId;
        let userId = req.user.id;
        if (advertId && userId) {
            likeService.likeToPost(userId, advertId).then(v => resp.json(v));
        } else {
            resp.status(400).send("Not all params");
        }
    }

    likeCount(req, resp) {
        let id = req.params.user || req.query.user;
        if (id) {
            likeService.countLikes(id).then(v => resp.json(v));
        } else {
            resp.status(204);
        }
    }
}

module.exports = LikeController;