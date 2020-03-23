const DislikeLikeController = require("../controllers/DislikeLikeController");
const express = require("express");
const router = express.Router();
const controller = new DislikeLikeController();

router.get("/(:user)?", function (req, resp) {
    controller.likeCount(req, resp).catch(() => resp.status(500));
});

router.put("/(:advertId)?", function (req, resp) {
    controller.sendLike(req, resp).catch(() => resp.status(500));
});

module.exports = router;