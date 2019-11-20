class UserService {
    constructor() {
        // For exemple simulate database
        this._DATABASE = {
            "157456782841851" : {
                name: "Victor",
                group: [1,2],
            },
            "157456782841514" : {
                name: "Laetitia",
                group: [2],
            },
            "157456782841326" : {
                name: "Mushroom",
                group: [1],
            }
        };
    }

    getUserByApiKey(apiKey) {
        return this._DATABASE[apiKey];
    }
}

module.exports = new UserService();