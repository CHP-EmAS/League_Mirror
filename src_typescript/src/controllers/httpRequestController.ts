import * as https from 'https';
import axios from 'axios';
import AuthInformation from "../models/authInformation";

export default class HttpRequestController {
    public static async makeRequest(url: string, authInfo: AuthInformation, method: string) {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        switch (method.toUpperCase()) {
            case 'POST':
                await axios.post(url, {
                    httpsAgent: agent,
                    auth: {
                        username: "riot",
                        password: authInfo.authToken
                    }
                });
                break;
            case 'GET':
                await axios.post(url, null, {
                    httpsAgent: agent,
                    auth: {
                        username: "riot",
                        password: authInfo.authToken
                    }
                });
                break;
        }
    }
}