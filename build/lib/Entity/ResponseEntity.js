"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseEntity = /** @class */ (function () {
    function ResponseEntity(_uid, callback) {
        this._uid = _uid;
        this.callback = callback;
        this._responseSend = false;
        this._status = 200;
    }
    ResponseEntity.prototype.status = function (status) {
        this._status = status;
        return this;
    };
    ResponseEntity.prototype.send = function (data) {
        if (this._responseSend) {
            throw new Error("The response " + this._uid + " is already sending");
        }
        this._responseSend = true;
        this.callback(this._uid, { headers: { status: this._status }, body: data });
    };
    return ResponseEntity;
}());
exports.default = ResponseEntity;
