const UserService = require("./UserService");
const AdvertService = require("./AdvertService");
const DislikeLikeService = require("./DislikeLikeService");
const ChatService = require("./ChatService");

const User = new UserService();
const Advert = new AdvertService();
const DislikeLike = new DislikeLikeService();
const Chat = new ChatService();

module.exports = {
    User,
    Chat,
    Advert,
    DislikeLike,
};