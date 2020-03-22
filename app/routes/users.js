const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();
const controller = new UserController();

router.get("/(:id)?", controller.selectUser);

router.post("/", controller.directlyCreateUser);

router.put("/(:id)?", controller.updateUser);

router.delete("/(:id)?", controller.deleteUser);

module.exports = router;