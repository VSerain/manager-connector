import ResponseEntity from './Entity/ResponseEntity';

export interface Config {
    "name": string, // The name of micro service
    "requireAuth": boolean // If true, the micro service require authentification 
    "isAuth": boolean // The service is the AuthService or not
    "requireAuthRoutes"?: Array<string>,
}

export interface RequestCallback {
    (requestParams: any, auth: any, data: any, response: ResponseEntity): void
}

export interface ErrorCallback {
    (error: any): void
}