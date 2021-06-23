import {createServer} from "http";
import socketIO from 'socket.io';
import LCSC from './LeagueClientSocketController';
import QueueChangeEvent from "../models/queueChangeEvent";
import SocketCommand from "../models/socketCommand";
import HttpRequestController from "./httpRequestController";

class ServerSocketController {

    private io?: socketIO.Server = undefined;
    private lcsc: LCSC;
    private readonly basicAuthToken: string;
    private readonly leaguePort: number;

    private webSocketPath: string = "/";
    private readonly validationFunction: (socket: socketIO.Socket, next: Function) => void;

    constructor(leaguePort: number, riotBasicAuthToken: string) {
        this.basicAuthToken = riotBasicAuthToken;
        this.leaguePort = leaguePort;
        this.validationFunction = (socket: socketIO.Socket, next: Function) => {
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
            handlePreflightRequest: ServerSocketController.handlePreflightRequest
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

        this.io.on("connection", (socket: socketIO.Socket) => {
            console.log("Remote Device connected!");
            socket.emit("log", "Connected to League Mirror! ♥");
        });

        this.io.on("command", async (data: SocketCommand) => {
            console.log(data);
            await HttpRequestController.makeRequest(`127.0.0.1:${this.leaguePort}${data.uri}`, this.basicAuthToken, data.method);
        });

        return true;
    }

    private static handlePreflightRequest(request: any, response: any) {
        const headers = {
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, user-token",
            "Access-Control-Allow-Origin": request.headers.origin,
            "Access-Control-Allow-Credentials": true
        };
        response.writeHead(200, headers);
        response.end();
    }

    public queueStateChanged(event: QueueChangeEvent) {
        if (!this.io) return;

        this.io.emit("queueEvent", JSON.stringify(event));

        console.log(event.state, event.timeElapsed, event.estimatedTime);
    }
}

export default ServerSocketController;