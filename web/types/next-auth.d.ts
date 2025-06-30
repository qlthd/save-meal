import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    uid?: string;
  }

  interface User {
    accessToken?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    uid?: string;
  }
}
