const userService = require("../services/services").User;
const Token = require("../database/db").Token;
const helper = require("./XcHelper");
const userRequiredParams = ["password", "name", "phoneNumber", "email"];
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const config = require("../../bin/config").getServerConfiguration();
const transportInfo = {
    service: "gmail",
    auth: {
        user: config.email,
        pass: config.email_password
    }
};

class SignController {

    static async _checkUserIdentity(req, resp) {
        if (helper.isBodyParamsExists(req, resp, userRequiredParams)) {
            if (await userService.get(userService.searchFields.EMAIL, req.body.email) === null) {
                if (await userService.get(userService.searchFields.PHONE, req.body.phoneNumber) === null) {
                    return true;
                } else {
                    resp.status(409).end("User with given phone number already exists");
                }
            } else {
                resp.status(409).end("User with given email already exists");
            }
        }
        return false;
    }

    async registrationUser(req, resp) {
        if (await SignController._checkUserIdentity(req, resp)) {
            try {
                const user = await userService.create(req.body);
                const token = user.generateAuthToken();
                req.body.id = user.id;
                delete req.body.password;
                await sendVerificationEmail(req, resp, user, () => {
                    resp.header("Access-Control-Expose-Headers", "x-auth-token");
                    resp.header("x-auth-token", token).json(req.body);
                });
            } catch (e) {
                helper.sendError(resp, e);
            }
        }
    }

    async verifyEmail(req, resp) {
        console.log(req.params.token);
        resp.end("You verified");
    }

    // TODO: developer access
    directlyCreateUser(req, resp) {
        if (helper.isBodyParamsExists(req, resp, userRequiredParams)) {
            userService.create(req.body).then(() => {
                delete req.body.password;
                resp.json(req.body);
            });
        }
    }
}

async function sendVerificationEmail(req, resp, user, callback) {
    /*const token = await Token.create({userId: user.id, token: crypto.randomBytes(16).toString("hex")});
    const transporter = nodemailer.createTransport(transportInfo);
    const emailOptions = createEmailOptions(req, user.email, token.token);
    transporter.sendMail(emailOptions, function (err) {
        if (err) return resp.status(500).end("Email sending error: " + err.message);
        callback();
    });*/
    callback();
}

function createEmailOptions(req, toMail, token) {
    return {
        from: config.email,
        to: toMail,
        subject: "HOMELESS email verification",
        html: `<h2>Please click to verify: http://${req.headers.host}/verification/${token}</h2>`
    };
}

module.exports = SignController;