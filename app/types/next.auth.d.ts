import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      name: string;
      randomKey?: string;
    };
  }

  interface User {
    id: string;
    name: string;
  }

  interface JWT {
    id: string;
    name: string;
    randomKey?: string;
  }
}
