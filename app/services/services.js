const UserService = require("./UserService");
const AdvertService = require("./AdvertService");
const LikeService = require("./LikeService");
const DislikeService = require("./DislikeService");

const User = new UserService();
const Advert = new AdvertService();
const Like = new LikeService();
const Dislike = new DislikeService();

module.exports = {
    User,
    Advert,
    Like,
    Dislike,
};