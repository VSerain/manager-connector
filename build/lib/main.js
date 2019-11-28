"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net = __importStar(require("net"));
var ResponseEntity_1 = __importDefault(require("./Entity/ResponseEntity"));
var globalHelper_1 = __importDefault(require("./helpers/globalHelper"));
var OliveConnector = /** @class */ (function () {
    function OliveConnector() {
        this._callbacksAuthRequest = [];
        this._callbacksRequest = [];
        this._callbacksConnectionClose = [];
        this.connected = false;
        this._socket = new net.Socket();
    }
    Object.defineProperty(OliveConnector.prototype, "config", {
        get: function () {
            if (this._config) {
                return this._config;
            }
            throw new Error("OliveConnector.config is not defined");
        },
        set: function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    OliveConnector.prototype.onRequest = function (callback) {
        this._callbacksRequest.push(callback);
    };
    OliveConnector.prototype.onAuthRequest = function (callback) {
        this._callbacksAuthRequest.push(callback);
    };
    OliveConnector.prototype.onConnectionClose = function (callback) {
        this._callbacksConnectionClose.push(callback);
    };
    OliveConnector.prototype.connectToManager = function (host, port) {
        this._socket.connect(port, host, this._socketConnected.bind(this));
    };
    OliveConnector.prototype._socketConnected = function () {
        var _this = this;
        this.connected = true;
        this._sendRequest("config", this.config, 0);
        this._socketOn("data", function (request) { return _this._onData(request); });
        this._socketOn("error", function (err) { return _this._onError(err); });
        this._socketOn("close", function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._onConnectionClose.apply(_this, args);
        });
    };
    OliveConnector.prototype._onData = function (request) {
        var onResponseSend = request.name === "request" ? this._onResponseSend : this._onAuthResponseSend;
        var response = new ResponseEntity_1.default(request.uid, onResponseSend.bind(this));
        var callbacks = request.name === "request" ? this._callbacksRequest : this._callbacksAuthRequest;
        if (callbacks.length === 0)
            return response.status(404).send();
        this._callCallbacks(callbacks, [
            request.requestParams,
            request.auth,
            request.data,
            response,
        ]);
    };
    OliveConnector.prototype._onResponseSend = function (uid, data) {
        this._sendRequest("response", data, uid);
    };
    OliveConnector.prototype._onAuthResponseSend = function (uid, data) {
        this._sendRequest("authResponse", data, uid);
    };
    OliveConnector.prototype._onError = function (error) {
        // @todo add error management
        this._onConnectionClose(error);
    };
    OliveConnector.prototype._onConnectionClose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.connected = false;
        this._callCallbacks(this._callbacksConnectionClose, args);
    };
    OliveConnector.prototype._callCallbacks = function (callbacks, args) {
        callbacks.forEach(function (callback) { return callback.apply(void 0, args); });
    };
    OliveConnector.prototype._sendRequest = function (name, data, uid) {
        this._socket.write(JSON.stringify({ name: name, data: data, uid: uid }));
    };
    OliveConnector.prototype._socketOn = function (name, callback) {
        this._socket.on(name, function (data) {
            var objectData = globalHelper_1.default.jsonValid(data.toString());
            if (objectData.error)
                return;
            callback(objectData);
        });
    };
    return OliveConnector;
}());
exports.default = new OliveConnector();
