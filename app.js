const lessMiddleware = require("less-middleware");
const schema = require("./app/graphql/schema");
const cookieParser = require("cookie-parser");
const graphql = require("express-graphql");
const createError = require("http-errors");
const protect = require("./app/protect");
const device = require("express-device");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const usersRouter = require("./app/routes/users");
const advertsRouter = require("./app/routes/adverts");
const likesRouter = require("./app/routes/likes");
const dislikesRouter = require("./app/routes/dislikes");
const chatsRouter = require("./app/routes/chats");
const app = express();

app.use(logger("dev")); // logger in dev mode
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(device.capture());

const SignController = require("./app/controllers/SignController");
const controller = new SignController();

app.use("/registration", controller.registrationUser);
app.use("/verification/(:token)", controller.verifyEmail);
app.use(protect.authMiddleware);
app.use("/graphql", graphql(schema));
app.use("/api/users", usersRouter);
app.use("/api/adverts", advertsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/dislikes", dislikesRouter);
app.use("/api/chats", chatsRouter);

app.use(function(req, resp, next) {
  next(createError(404));
});

app.use(function(err, req, resp) {
  resp.locals.message = err.message;                                   // uses
  resp.locals.error = req.app.get("env") === "development" ? err : {}; // for
  resp.status(err.status || 500);                                      // view
  //resp.render("error");                                              // !
  resp.sendStatus(err.status || 500);
});

module.exports = app;
