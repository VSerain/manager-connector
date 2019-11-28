"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __importDefault(require("../../lib/main"));
var user_service_1 = __importDefault(require("./user-service"));
var appilcationConstants = {
    GROUPES: {
        ADMIN: 1,
        USER: 2,
    },
};
main_1.default.config = {
    name: "auth",
    requireAuth: false,
    isAuth: true,
    requireAuthRoutes: [
        ".\/test",
    ],
};
main_1.default.onAuthRequest(function (_a, auth, data, response) {
    var headers = _a.headers;
    if (!headers["api-key"])
        return response.status(501).send();
    var user = user_service_1.default.getUserByApiKey(headers["api-key"]);
    if (!user)
        return response.status(501).send();
    response.send({ user: user, constants: appilcationConstants });
});
main_1.default.onRequest(function (request, auth, data, response) {
    response.status(200).send("Hello");
});
main_1.default.onConnectionClose(function (info) {
    setTimeout(function () {
        process.exit();
    }, 1000);
});
main_1.default.connectToManager("127.0.0.1", 9999);
