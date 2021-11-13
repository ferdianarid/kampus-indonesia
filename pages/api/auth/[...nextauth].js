import backendApi from "configs/api/backendApi";
import { DateTime } from "luxon";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = req.body;
        try {
          const {
            data: {
              data: {
                token: { access_token, expires_in: expires },
              },
            },
          } = await backendApi.post("/login", {
            email: "jaytzu13@gmail.com",
            password: "helloworld",
          });

          const {
            data: { data: user },
          } = await backendApi.get("/profile", {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          });

          user.expires = expires;
          user.access_token = access_token;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("error", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
    // maxAge: 60 * 60,
  },

  jwt: {
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return user;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const { access_token, role, expires } = user;
        token = {
          ...token,
          access_token,
          role,
          expires,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        const { access_token, role, expires } = token;
        session = {
          ...session,
          expires: DateTime.local().plus(expires).toUTC().toString(),
          access_token,
          user: { ...session.user, role },
        };
      }
      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },

  debug: true,
});
