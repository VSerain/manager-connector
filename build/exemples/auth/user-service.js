"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserService = /** @class */ (function () {
    function UserService() {
        // For exemple simulate database
        this._DATABASE = {
            157456782841851: {
                name: "Victor",
                group: [1, 2],
            },
            157456782841514: {
                name: "Laetitia",
                group: [2],
            },
            157456782841326: {
                name: "Mushroom",
                group: [1],
            },
        };
    }
    UserService.prototype.getUserByApiKey = function (apiKey) {
        return this._DATABASE[apiKey];
    };
    return UserService;
}());
exports.default = new UserService();
