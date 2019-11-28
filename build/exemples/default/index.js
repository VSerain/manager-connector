"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __importDefault(require("../../lib/main"));
main_1.default.config = {
    name: "default",
    requireAuth: true,
    isAuth: false,
};
main_1.default.onRequest(function (requestParams, auth, data, response) {
    response.status(504).send({ MSG: "Hello " + auth.user.name });
});
main_1.default.onConnectionClose(function (info) {
    setTimeout(function () {
        process.exit();
    }, 1000);
});
main_1.default.connectToManager("127.0.0.1", 9999);
