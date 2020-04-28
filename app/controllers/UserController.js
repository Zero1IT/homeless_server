const userService = require("../services/services").User;
const helper = require("./XcHelper");

class UserController {

    selectUser(req, resp) {
        userService.get(userService.searchFields.ID,req.params.id || req.query.id).then(v => resp.json(v));
    }

    updateUser(req, resp) {
        let params = helper.ejectQueryParams(req, resp, "id");
        if (params) {
            if (helper.isBodyParamsExists(req, resp)) {
                userService.update(params.id, req.body).then(v => resp.json(v));
            }
        }
    }

    deleteUser(req, resp) {
        let params = helper.ejectQueryParams(req, resp, "id");
        if (params) {
            userService.delete(params.id).then(v =>
                v ? resp.status(204) : resp.status(500).end("User not deleted"));
        }
    }
}

module.exports = UserController;