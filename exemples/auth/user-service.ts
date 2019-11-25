class UserService {
    // For exemple simulate database
    private _DATABASE: any= {
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

    getUserByApiKey(apiKey: string) {
        return this._DATABASE[apiKey];
    }
}
export default new UserService();