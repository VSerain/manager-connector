const oliveConnector = require("../build/main");

oliveConnector.config = {
    "name": "testname",
    "requireAuth": false,
    "isAuth": false,
}

oliveConnector.onRequest((requestParams, auth, data, response) => {
    // console.log(requestParams, auth, data, response);

    response.send({h: 0});
});

oliveConnector.onConnectionClose((info) => {
    
});

oliveConnector.connectToManager("127.0.0.1", 9999);