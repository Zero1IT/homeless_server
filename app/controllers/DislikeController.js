const dislikeService = require("../services/services").Dislike;

class DislikeController {

    dislikeCount(req, resp) {
        let id = req.params.user || req.query.user;
        if (id) {
            dislikeService.countDislikes(id).then(v => resp.json(v));
        } else {
            resp.status(204); // no content
        }
    }

    sendDislike(req, resp) {
        let advertId = req.params.userId || req.query.userId;
        let userId = req.user.id;
        if (advertId && userId) {
            dislikeService.dislikeToPost(userId, advertId).then(v => resp.json(v));
        } else {
            resp.status(400).send("Not all params");
        }
    }
}

module.exports = DislikeController;