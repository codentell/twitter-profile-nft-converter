import TwitterProvider from "next-auth/providers/twitter";
import { ThirdwebNextAuth } from "@thirdweb-dev/auth/next-auth";


export const { NextAuthHandler, getUser } = ThirdwebNextAuth({
  privateKey: process.env.ADMIN_PRIVATE_KEY || "",
  domain: "example.com",
  nextOptions: {
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
        version: "2.0", // opt-in to Twitter OAuth 2.0
      }),
    ],
  },
});

export default NextAuthHandler();