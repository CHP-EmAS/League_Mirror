import { createServer } from "http";
import * as SocketIO from 'socket.io';
import LCSC from './LeagueClientSocketController';

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

        this.io = new SocketIO.Server(httpServer, {
            path: this.webSocketPath,
            cors: {
                origin: '*',
            }
        });

        this.init();
        httpServer.listen(3000);

        console.log("League Mirror Socket started!");

        this.lcsc.start();
    }

    private init(): boolean {
        if (!this.io) return false;

        this.io.use(this.validationFunction);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            socket.emit("log", {msg: "Connected to League Mirror! ♥"});
        });

        return true;
    }

    public queueStateChanged(inQueue: boolean, timeElapsed: number, estimatedTime: number) {
        console.log(inQueue, timeElapsed, estimatedTime);
    }
}

export default ServerSocketController;