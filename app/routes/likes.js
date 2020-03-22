const LikeController = require("../controllers/LikeController");
const express = require("express");
const router = express.Router();
const controller = new LikeController();

router.get("/(:user)?", controller.likeCount);

router.put("/(:advertId)?", controller.sendLike);

module.exports = router;