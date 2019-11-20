export default class ResponseEntity {
    private _responseSend: boolean = false;
    private _status: number = 200;
    
    constructor(private _uid: number, private callback: (uid:number, data:any)=> void) {}

    status(status:number) {
        this._status = status;
        return this;
    }

    send(data:any) {
        if (this._responseSend) {
            throw new Error("The response " + this._uid + " is already sending");
        }
        this._responseSend = true;
        this.callback(this._uid, { status: this._status ,data});
    }
}