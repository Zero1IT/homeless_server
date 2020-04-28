const chatService = require("../services/services").Chat;
const helper = require("./XcHelper");
const messageParams = ["chatId", "text"];

class ChatController {

    sendMessage(req, resp) {
        if (helper.isBodyParamsExists(req, resp, messageParams)) {
            req.body.userId = req.user.id;
            chatService.createMessage(req.body).then(v => resp.json(v));
        }
    }

    chatOrMessages(req, resp) {
        const id = req.params.id || req.query.id;
        if (id) {
            chatService.getMessages(id).then(v => resp.json(v));
        } else {
            chatService.get(req.user.id).then(v => resp.json(v));
        }
    }

    createChat(req, resp) {
        if (helper.isBodyParamsExists(req, resp, "guestId")) {
            chatService.create(req.user.id, req.body.guestId).then(v => resp.json(v));
        }
    }

    async deleteChat(req, resp) {
        const params = helper.ejectQueryParams(req, resp, "id");
        const deleted = await chatService.delete(params.id);
        resp.json({deleted});
    }
}

module.exports = ChatController;