"use server"

import {z} from "zod";
import {NewPasswordSchema} from "@/schemas";
import {getPasswordResetToken} from "@/data/password-reset-token";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return {error: "Missing token."}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields."}
    }

    const { password } = validatedFields.data;
    const existingToken = await getPasswordResetToken(token)
    if (!existingToken) {
        return {error: "Invalid token."}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {error: "Token expired."}
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return {error: "Email does not exists."}
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })
    return {success: "Password updated."}
}