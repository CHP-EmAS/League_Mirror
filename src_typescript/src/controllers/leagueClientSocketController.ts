import WebSocket from 'ws';

class LeagueClientSocketController {

    private webSocket?: WebSocket = undefined;

    private leaguePort: number;
    private riotBasicAuthToken: string;

    constructor(leaguePort: number, riotBasicAuthToken: string) {
        this.leaguePort = leaguePort;
        this.riotBasicAuthToken = riotBasicAuthToken;
    }

    public start() {
        
        if(this.webSocket)
            this.webSocket.close();

        this.webSocket = new WebSocket(`wss://127.0.0.1:${this.leaguePort}/`, "wamp", {
            rejectUnauthorized: false,
            headers: {
                "Authorization": this.riotBasicAuthToken
            }
        });

        this.init();
    }

    private init(): boolean {
        if(!this.webSocket) return false;

        this.webSocket.on('open', function open() {
            console.log('Connected to League Client! ♥');
            this.send("[5,\"OnJsonApiEvent\"]");
        });
          
        this.webSocket.on('close', function close() {
            console.log('Disconnectet from League Client! :(');
        });
          
        this.webSocket.on('message', function incoming(data) {
            //TODO
            console.log(data);
        });

        this.webSocket.addEventListener('error', (err) => console.log(err.message));

        return true;
    }
    
}

export default LeagueClientSocketController;