import * as https from 'https';
import axios from 'axios';

export default class HttpRequestController {
    public static async makeRequest(url: string, basicAuthToken: string, method: string) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        axios.defaults.httpsAgent = agent;

        switch (method.toUpperCase()) {
            case 'POST':
                await axios.post(url, {
                    headers: {
                        Authorization: basicAuthToken
                    }
                });
                break;
            case 'GET':
                await axios.post(url, {
                    headers: {
                        Authorization: basicAuthToken
                    }
                });
                break;
        }
    }
}