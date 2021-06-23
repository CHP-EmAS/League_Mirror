import { createServer } from "http";
import socketIO from 'socket.io';
import LCSC from './LeagueClientSocketController';
import QueueChangeEvent from "../models/queueChangeEvent";

class ServerSocketController {

    private io?: SocketIO.Server = undefined;
    private lcsc: LCSC;

    private webSocketPath: string = "/";
    private validationFunction: (socket: SocketIO.Socket, next: Function) => void;

    constructor(leaguePort: number, riotBasicAuthToken: string) {
        this.validationFunction = (socket: SocketIO.Socket, next: Function) => {
            return next();
        };

        this.lcsc = new LCSC(leaguePort, riotBasicAuthToken, this);
    }

    public start() {
        if (this.io) {
            this.io.close();
        }

        const httpServer = createServer();

        this.io = socketIO(httpServer, {
            path: this.webSocketPath,
            handlePreflightRequest: this.handlePreflightRequest
        });

        this.init();
        httpServer.listen(5000, "0.0.0.0", () => {
            console.log("League Mirror Socket started!");
        });

        this.lcsc.start();
    }

    private init(): boolean {
        if (!this.io) return false;

        this.io.use(this.validationFunction);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            console.log("Remote Divice connected!");
            socket.emit("log", {msg: "Connected to League Mirror! ♥"});
        });

        return true;
    }

    private handlePreflightRequest(request: any, response: any) {
        const headers = {
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, user-token",
            "Access-Control-Allow-Origin": request.headers.origin, 
            "Access-Control-Allow-Credentials": true
        };
        response.writeHead(200, headers);
        response.end();
    }

    public queueStateChanged(event: QueueChangeEvent) {
        console.log(event.state, event.timeElapsed, event.estimatedTime);
    }
}

export default ServerSocketController;