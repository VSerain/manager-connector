const oliveConnector = require("../../build/main");
const userService = require("./user-service");

const appilcationConstants = {
    GROUPES : {
        ADMIN: 1,
        USER: 2
    }
}

oliveConnector.config = {
    "name": "auth",
    "requireAuth": false,
    "isAuth": true,
}

oliveConnector.onAuthRequest(({headers}, auth, data, response) => {
    if (!headers["api-key"]) return response.status(501).send();
    const user = userService.getUserByApiKey(headers["api-key"])
    if (!user) return response.status(501).send();
    response.send({user, constants: appilcationConstants});
});

oliveConnector.onConnectionClose((info) => {
    process.exit();
});

oliveConnector.connectToManager("127.0.0.1", 9999);