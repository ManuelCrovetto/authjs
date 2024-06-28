import {db} from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verificationToken.findUnique({
            where: {
                token: token
            }
        })
    } catch {
        return null
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email: email
            }
        })
    } catch {
        return null
    }
}