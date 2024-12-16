import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUsersByID } from "@/services/user";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId) {
  throw new Error("GOOGLE_CLIENT_ID is required");
}

if (!clientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET is required");
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: { 
    async signIn({ user }) {
      try {
        const doseUserExists = await getUsersByID(user.id);

        if (!doseUserExists) {
          await createUser({
            id: user.id,
            name: user.name || "User",
            email: user.email || "email",
            image: user.image || "/user.png",
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // session({ session, token }) {
    //   if (session.user) {
    //     session.user.id = token.sub as string;
    //   }

    //   return session;
    // },
  },
};

export default authOptions;
