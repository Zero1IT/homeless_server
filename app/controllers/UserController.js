const userService = require("../services/services").User;

class UserController {

    selectUser(req, resp) {
        userService.get(req.params.id || req.query.id).then(v => resp.json(v));
    }

    async registrationUser(req, resp) {
        if (Object.keys(req.body).length !== 0) {
            const user = await userService.create(req.body);
            const token = user.generateAuthToken();
            delete req.body.password;
            resp.header("x-auth-token", token).json(req.body);
        } else {
            resp.status(400).send("Body is empty");
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