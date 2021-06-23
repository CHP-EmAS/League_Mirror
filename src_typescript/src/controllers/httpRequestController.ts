import axios from 'axios';

export default class HttpRequestController {
    public static async makeRequest(url: string, basicAuthToken: string, method: string) {
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