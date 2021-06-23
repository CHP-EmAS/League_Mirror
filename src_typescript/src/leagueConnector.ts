import dotenv from 'dotenv';
dotenv.config();

import ServerSocketController from "./controllers/serverSocketController";
import AuthController from './controllers/authController';

const PORT = process.env.PORT || 3000;
const VERSION = "0.8.10";

console.log("########################## League Connector - Version: " + VERSION + " ##########################");
console.log(" ");
console.log("Starting League Connector on Port: " + PORT + " ...");
console.log("Loading League Client Informations ...");
console.log(" ");

AuthController.getAuthenticationInformation().then(leagueInfo => {
    console.log(" ");
    const serverSocket = new ServerSocketController(leagueInfo);
    serverSocket.start();
}).catch(error => {
    console.log("FATAL ERROR: " + error);
});



