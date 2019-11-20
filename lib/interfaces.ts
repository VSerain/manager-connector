export interface Config {
    "name": string, // The name of micro service
    "requireAuth": boolean // If true, the micro service require authentification 
    "isAuth": boolean // The service is the AuthService or not
}

export interface RequestCallback {
    (requestParams: any, auth: any, data: any, response: (data:any) => void): void
}