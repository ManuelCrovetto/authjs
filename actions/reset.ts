"use server"

import {z} from "zod";
import {ResetSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);
    if (!validateFields.success) {
        return {error: "Invalid fields."}
    }

    const { email } = validateFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return {error: "Email does not exist."}
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
        existingUser?.name ?? ""
    )

    return {success: "Password reset email sent."}
}