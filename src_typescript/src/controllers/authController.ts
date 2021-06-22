import AuthInformation from "../models/authInformation";

// tslint:disable-next-line:no-var-requires
const {exec} = require('child-process-async');

class AuthController {
  private static async getLCUProcessInfo(): Promise<string> {
    const process = await exec("WMIC PROCESS WHERE name='LeagueClientUx.exe' GET commandline", {});

    const {stdout} = await process;
    return stdout;
  }

  static async getAuthenticationInformation(): Promise<AuthInformation> {
    const processString = await this.getLCUProcessInfo();
    const authToken = processString.match(`"--remoting-auth-token=(.+?)"`);
    if (!authToken || !authToken[1]) {
      throw new Error("Could not parse remoting auth token");
    }

    const port = processString.match(`"--app-port=(\\d+?)"`);
    if (!port || !port[1]) {
      throw new Error("Could not parse app port");
    }

    console.log("League Client Port: " + port[1]);
    console.log("League Client Auth: " + authToken[1]);

    return {
      port: parseInt(port[1], 0),
      authToken: authToken[1],
      basicAuthToken: `Basic ${Buffer.from(`riot:${authToken[1]}`).toString('base64')}`
    };
  }
}

export default AuthController;