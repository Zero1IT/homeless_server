const userService = require("../services/services").User;
const helper = require("./XcHelper");

class UserController {

    static async _checkUserIdentity(req, resp) {
        if (helper.isBodyParamsExists(req, resp, "password", "name", "phoneNumber", "email")) {
            if (await userService.get(userService.searchFields.EMAIL, req.body.email) === null) {
                if (await userService.get(userService.searchFields.PHONE, req.body.phoneNumber) === null) {
                    return true;
                } else {
                    resp.status(409).send("User with given phone number already exists");
                }
            } else {
                resp.status(409).send("User with given email already exists");
            }
        }
        return false;
    }

    selectUser(req, resp) {
        userService.get(userService.searchFields.ID,req.params.id || req.query.id).then(v => resp.json(v));
    }

    async registrationUser(req, resp) {
        if (await UserController._checkUserIdentity(req, resp)) {
            const user = await userService.create(req.body);
            const token = user.generateAuthToken();
            req.body.id = user.id;
            delete req.body.password;
            resp.header("x-auth-token", token).json(req.body);
        }
    }

    // developer access
    directlyCreateUser(req, resp) {
        if (Object.keys(req.body).length !== 0) {
            userService.create(req.body).then(() => {
                delete req.body.password;
                resp.json(req.body);
            });
        } else {
            resp.status(400).send("Body is empty");
        }
    }

    updateUser(req, resp) {
        userService.update(req.params.id || req.query.id, req.body).then(v => resp.json(v));
    }

    deleteUser(req, resp) {
        service.User.delete(req.params.id || req.query.id, req.body).then(v =>
            v ? resp.status(204) : resp.status(500).send("User not deleted"));
    }
}

module.exports = UserController;