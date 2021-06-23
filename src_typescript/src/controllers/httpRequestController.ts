export default class HttpRequestController {
    public static async makeRequest(url: string, basicAuthToken: string, method: string) {
        const options = {
            method,
            headers: {
                'Authorization': `Basic ${basicAuthToken}`
            }
        };
        await fetch(url, options);
    }
}