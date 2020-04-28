const ChatController = require("../controllers/ChatController");
const express = require("express");
const router = express.Router();
const controller = new ChatController();

// without param id get all user's chats, with id return all messages from chat
router.get("/(:id)?", controller.chatOrMessages);
// create chat
router.post("/", controller.createChat);
// send message
router.post("/send", controller.sendMessage);
// TODO: connect by websocket
router.post("/connection", (req, resp) => {
    req.assert()
});
// deletes closed chat
router.delete("/(:id)?", controller.deleteChat);

module.exports = router;