import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "creadentail-provider-id",
      name: "NextAuthApp", // The name to display on the sign in form (e.g. "Sign in with NextAuthApp")
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "abc@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        console.log(req);
        const user = { id: "1", username: credentials?.username || "" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback", { token, user });
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/sign-in", // custom page route - ?
  // },
};
