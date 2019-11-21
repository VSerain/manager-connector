import oliveConnector from "../../lib/main"
import ResponseEntity from "../../lib/Entity/ResponseEntity"
import userService from "./user-service";

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

oliveConnector.onAuthRequest(({headers}, auth: any, data: any, response: ResponseEntity) => {
    if (!headers["api-key"]) return response.status(501).send();

    const user = userService.getUserByApiKey(headers["api-key"])
    if (!user) return response.status(501).send();
    
    response.send({user, constants: appilcationConstants});
});

oliveConnector.onConnectionClose((info) => {
    process.exit();
});

oliveConnector.connectToManager("127.0.0.1", 9999);