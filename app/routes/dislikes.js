const DislikeController = require("../controllers/DislikeController");
const express = require("express");
const router = express.Router();
const controller = new DislikeController();

router.get("/(:user)?", controller.dislikeCount);

router.put("/(:advertId)?", controller.sendDislike);

module.exports = router;