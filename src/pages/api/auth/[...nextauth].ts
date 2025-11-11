import NextAuth from "next-auth";
import { authOptions } from "@/server/auth";
//import GoogleProvider from "next-auth/providers/google";

/*
export const authOptions = {
  providers: [
    GoogleProvider(<GoogleAuth>{
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
*/

export default NextAuth(authOptions); // this function automatically creates the /api/auth/* endpoints like signin and signout, callbacks google and session