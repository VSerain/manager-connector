import ResponseEntity from "./Entity/ResponseEntity";
export interface Config {
    "name": string;
    "requireAuth": boolean;
    "isAuth": boolean;
    "requireAuthRoutes"?: Array<string>;
}
export interface RequestCallback {
    (requestParams: any, auth: any, data: any, response: ResponseEntity): void;
}
export interface ErrorCallback {
    (error: any): void;
}
