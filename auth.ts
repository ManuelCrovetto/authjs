import NextAuth, {DefaultSession} from "next-auth"
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";
import {getAccountByUserId} from "@/data/account";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean,
    isOAuth: boolean
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        },
    },
    callbacks: {
        async signIn({user, account}) {
            if (account?.provider !== "credentials") {
                return true
            }
            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) {
                console.log("User not verified")
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if (!twoFactorConfirmation) {
                    return false
                }

                await db.twoFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id}
                })
            }
            return true

        },
        async jwt({token}) {
            console.log("I am being called again")
            if (!token.sub) {
                return token
            }

            const existingUser = await getUserById(token.sub)
            if (!existingUser) {
                return token
            }
            const existingAccount = await getAccountByUserId(existingUser.id)

            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            return token
        },
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email as string
                session.user.isOAuth = token.isOAuth as boolean
            }
            return session
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig
})