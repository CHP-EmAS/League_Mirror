import * as https from 'https';
import axios from 'axios';

export default class HttpRequestController {
    public static async makeRequest(url: string, basicAuthToken: string, method: string) {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        switch (method.toUpperCase()) {
            case 'POST':
                await axios.post(url, {
                    httpsAgent: agent,
                    headers: {
                        Authorization: basicAuthToken
                    }
                });
                break;
            case 'GET':
                await axios.post(url, {
                    httpsAgent: agent,
                    headers: {
                        Authorization: basicAuthToken
                    }
                });
                break;
        }
    }
}