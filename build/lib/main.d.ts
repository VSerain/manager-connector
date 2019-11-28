import { Config, RequestCallback, ErrorCallback } from "./interfaces";
declare class OliveConnector {
    private _config?;
    private _callbacksAuthRequest;
    private _callbacksRequest;
    private _callbacksConnectionClose;
    private _socket;
    connected: boolean;
    constructor();
    config: Config;
    onRequest(callback: RequestCallback): void;
    onAuthRequest(callback: RequestCallback): void;
    onConnectionClose(callback: ErrorCallback): void;
    connectToManager(host: string, port: number): void;
    private _socketConnected;
    private _onData;
    private _onResponseSend;
    private _onAuthResponseSend;
    private _onError;
    private _onConnectionClose;
    private _callCallbacks;
    private _sendRequest;
    private _socketOn;
}
declare const _default: OliveConnector;
export default _default;
