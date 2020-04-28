const UserController = require("../controllers/UserController");
const SignController = require("../controllers/SignController");
const express = require("express");
const router = express.Router();
const controller = new UserController();
const sign = new SignController();

router.get("/(:id)?", controller.selectUser);

router.post("/", sign.directlyCreateUser);

router.put("/(:id)?", controller.updateUser);

router.delete("/(:id)?", controller.deleteUser);

module.exports = router;