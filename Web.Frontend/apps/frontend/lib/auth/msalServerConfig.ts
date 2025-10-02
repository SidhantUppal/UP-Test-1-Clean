import { Configuration, LogLevel } from "@azure/msal-node";

export const msalServerConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID || "common"}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET || "", // This needs to be added to env
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        if (process.env.NODE_ENV === 'development' && !containsPii) {
          console.log(message);
        }
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Warning,
    },
  },
};

export const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/api/auth/callback";

export const authCodeRequest = {
  redirectUri: REDIRECT_URI,
  scopes: ["User.Read", "openid", "profile", "email"],
};