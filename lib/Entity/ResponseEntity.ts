export default class ResponseEntity {
    private _responseSend: boolean = false;
    constructor(private _uid: number, private callback: (uid:number, data:any)=> void) {}

    send(data:any) {
        if (this._responseSend) {
            throw new Error("The response " + this._uid + " is already sending");
        }
        this._responseSend = true;
        this.callback(this._uid, data);
    }
}