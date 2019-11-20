import * as net from "net";
import { Config, RequestCallback } from "./interfaces";
import ResponseEntity from "./Entity/ResponseEntity"
import managerHelper from "./helpers/managerHelper";

class OliveConnector {
    private _config?: Config;
    private _callbacksAuthRequest: Array<RequestCallback> = [];
    private _callbacksRequest: Array<RequestCallback> = [];
    private _callbacksConnectionClose: Array<(error:any) => void> = [];
    private _socket: net.Socket;
    public connected: boolean = false;

    constructor() {
        this._socket = new net.Socket();
    }

    set config(config: Config) {
        this._config = config;
    }

    get config(): Config {
        if (this._config) {
            return this._config;
        }
        throw new Error("OliveConnector.config is not defined");
    }

    onRequest(callback: RequestCallback) {
        this._callbacksRequest.push(callback);
    }

    onAuthRequest(callback: RequestCallback) {
        this._callbacksAuthRequest.push(callback);
    }

    onConnectionClose(callback: (error: any) => void) {
        this._callbacksConnectionClose.push(callback);
    }

    connectToManager(host: string, port: number) {
        this._socket.connect(port, host, this._socketConnected.bind(this));
    }

    _socketConnected() {
        this.connected = true;
        this._sendRequest("config", this.config, 0);
        this._socketOn("data", (request) => this._onData(request));
        this._socketOn("error", (err) => this._onError(err));
        this._socketOn("close", (...args) => this._onConnectionClose(...args));
    }

    private _onData(request: any) {
        const response = new ResponseEntity(request.uid, this._onResponseSend.bind(this));
        const callbacks = request.name == "request" ? this._callbacksRequest : this._callbacksAuthRequest;
        this._callCallbacks(callbacks, [
                request.requestParams,
                request.auth,
                request.data,
                response
            ]
        )
    }

    private _onResponseSend(uid: number, data: any) {
        this._sendRequest("response", data, uid);
    }

    private _onError(error: any) {
        // @todo add error management
        this._onConnectionClose(error);
    }

    private _onConnectionClose(...args: any) {
        this.connected = false;
        this._callCallbacks(this._callbacksConnectionClose, args)
    }

    private _callCallbacks(callbacks: Array<any>, args: any) {
        callbacks.forEach(callback => callback(...args))
    }

    private _sendRequest(name: string, data: any, uid: number) {
        this._socket.write(JSON.stringify({name,data,uid}))
    }

    private _socketOn(name:string, callback: (data: any) => void) {
        this._socket.on(name,(data: any) => {
            const objectData = managerHelper.jsonValid(data.toString());
            if (objectData.error) return;
            callback(objectData);
        });
    }
}


module.exports = new OliveConnector();