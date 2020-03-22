const AdvertController = require("../controllers/AdvertController");
const express = require("express");
const router = express.Router();
const controller = new AdvertController();

router.get("/my/", controller.usersAdverts);

router.get("/new/(:limit)?", controller.notWatchedAdverts);

router.get("/users/(:id)?", controller.usersInterestedInAdvert);

router.get("/(:id)?", controller.selectAdverts);

router.post("/", controller.createAdvert);

router.put("/(:id)?", controller.updateAdvert);

router.delete("/(:id)?", controller.deleteAdvert);

module.exports = router;