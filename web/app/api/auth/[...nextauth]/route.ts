import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { Configuration, UserApi } from "@/web/api-client/src";
const MAX_AGE = 1 * 24 * 60 * 60;
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userApi = new UserApi(
          new Configuration({
            basePath:
              process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
          }),
        );
        const user = await userApi.findByEmailAndPassword({
          email: credentials?.email || "",
          password: credentials?.password || "",
        });

        if (user) {
          return {
            ...user,
            accessToken: jwt.sign(user, "123"),
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: MAX_AGE,
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error("Token is required for encoding");
      }

      const { sub, ...tokenProps } = token;
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expirationTimestamp = nowInSeconds + MAX_AGE;

      const jwtToken = jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: "HS256",
        },
      );
      return jwtToken;
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error("Token is undefined");
      }
      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ["HS256"],
        });
        return decodedToken as JWT;
      } catch (error) {
        console.error("JWT decode error", error);
        return null;
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt callback", { token, user });
      if (user) {
        token.uid = user.id;
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("jwt callback 2", { session, token });
      session.user = token.user || {};
      session.accessToken = token.accessToken;
      session.uid = token.uid;
      return session;
    },
  },
  secret: "123",
  debug: true,
});

export { handler as GET, handler as POST };
