const oliveConnector = require("../../build/main");

oliveConnector.config = {
    "name": "default",
    "requireAuth": true,
    "isAuth": false,
}

oliveConnector.onRequest((requestParams, auth, data, response) => {
    response.status(504).send({MSG: "Hello " + auth.user.name});
});

oliveConnector.onConnectionClose((info) => {
    
});

oliveConnector.connectToManager("127.0.0.1", 9999);