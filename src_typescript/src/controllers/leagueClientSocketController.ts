import WebSocket from 'ws';
import GeneralRequest from "../models/leagueEventTypes/generalRequest";
import MatchmakingSearchUpdate from "../models/leagueEventTypes/matchmakingSearchUpdate";
import MatchmakingSearchStateUpdate from "../models/leagueEventTypes/matchmakingSearchStateUpdate";
import ServerSocketController from "./serverSocketController";
import QueueChangeEvent, {queueState} from "../models/queueChangeEvent";

class LeagueClientSocketController {

    private webSocket?: WebSocket = undefined;

    private readonly leaguePort: number;
    private readonly riotBasicAuthToken: string;
    private readonly serverSocketController: ServerSocketController;

    constructor(leaguePort: number, riotBasicAuthToken: string, serverSocketController: ServerSocketController) {
        this.leaguePort = leaguePort;
        this.riotBasicAuthToken = riotBasicAuthToken;
        this.serverSocketController = serverSocketController;
    }

    public start() {

        if (this.webSocket)
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
        if (!this.webSocket) return false;

        this.webSocket.on('open', function open() {
            console.log('Connected to League Client! ♥');
            this.send("[5,\"OnJsonApiEvent\"]");
        });

        this.webSocket.on('close', function close() {
            console.log('Disconnectet from League Client! :(');
        });

        this.webSocket.on('message', data => {
            // TODO
            const jsonData: GeneralRequest = JSON.parse(data.toString())[2];
            switch (jsonData.eventType) {
                case "Update":
                    switch (jsonData.uri) {
                        case "/lol-matchmaking/v1/search":
                            const queueData: MatchmakingSearchUpdate = jsonData.data;
                            this.serverSocketController.queueStateChanged({
                                state: queueState.inQueue,
                                timeElapsed: queueData.timeInQueue,
                                estimatedTime: queueData.estimatedQueueTime
                            });
                            break;
                        case "/lol-lobby/v2/lobby/matchmaking/search-state":
                            const searchData: MatchmakingSearchStateUpdate = jsonData.data;
                            let queueEvent: QueueChangeEvent;
                            switch (searchData.searchState) {
                                case "Invalid":
                                    queueEvent = {
                                        state: queueState.outQueue,
                                    };
                                    break;
                                case "Found":
                                    queueEvent = {
                                        state: queueState.found
                                    };
                                    break;
                                default:
                                    // state Searching
                                    queueEvent = {
                                        state: queueState.inQueue
                                    };
                                    break;
                            }
                                this.serverSocketController.queueStateChanged(queueEvent);
                            break;
                        default:
                           // console.log(data);
                    }
                    break;
                default:
                   // console.log(data);
            }
        });

        this.webSocket.addEventListener('error', (err) => console.log(err.message));

        return true;
    }

}

export default LeagueClientSocketController;