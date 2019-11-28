export default class ResponseEntity {
    private _uid;
    private callback;
    private _responseSend;
    private _status;
    constructor(_uid: number, callback: (uid: number, data: any) => void);
    status(status: number): this;
    send(data?: any): void;
}
