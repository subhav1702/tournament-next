import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

            const email = credentials?.username;
            console.log(credentials)

            const user = await prisma.user.findFirst({where: {email: email}});

            console.log(user)

            if (user) {
              return {...user, id: String(user.id)}
            } else {
              return null
            }
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }