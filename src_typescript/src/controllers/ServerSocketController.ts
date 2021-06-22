import {Server} from "http";
import * as SocketIO from 'socket.io' ;
import LCSC from './LeagueClientSocketController'

class ServerSocketController {

    private io?: SocketIO.Server = undefined;
    private lcsc: LCSC;

    private webSocketPath: string =  "/";
    private validationFunction: (socket: SocketIO.Socket, next: Function) => void;

    constructor(leaguePort: number, riotBasicAuthToken: string) {
        this.validationFunction = (socket: SocketIO.Socket, next: Function) => {return next();}
            
        this.lcsc = new LCSC(leaguePort, riotBasicAuthToken);
    }

    public start() {
        if(this.io) {
            this.io.close; 
        }
            
        this.io = new SocketIO.Server({
            path: this.webSocketPath,
            cors: {
                origin: '*',
            }
        });

        this.init();

        console.log("League Mirror Socket started!");

        this.lcsc.start();
    }

    private init(): boolean {
        if(!this.io) return false;

        this.io.use(this.validationFunction);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            socket.emit("log",{msg: "Connected to League Mirror! ♥"})
        });

        return true;
    }
    
}

export default ServerSocketController;