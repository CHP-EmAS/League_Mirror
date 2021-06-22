import dotenv from 'dotenv';
dotenv.config();

import ServerSocketController from "./controllers/ServerSocketController"
import AuthController from './controllers/AuthController';

import { Server } from 'http';

const PORT = process.env.PORT || 3000;
const VERSION = "0.8.10";

console.log("########################## League Connector - Version: " + VERSION + " ##########################");
console.log(" ");
console.log("Starting League Connector on Port: " + PORT + " ...");

AuthController.getAuthenticationInformation().then(leagueInfo => {
    const serverSocket = new ServerSocketController(leagueInfo.port, leagueInfo.basicAuthToken)
    serverSocket.start();
}).catch(error => {
    console.log("FATAL ERROR: " + error);
});



