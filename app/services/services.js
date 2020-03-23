const UserService = require("./UserService");
const AdvertService = require("./AdvertService");
const DislikeLikeService = require("./DislikeLikeService");

const User = new UserService();
const Advert = new AdvertService();
const DislikeLike = new DislikeLikeService();

module.exports = {
    User,
    Advert,
    DislikeLike,
};