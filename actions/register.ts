"use server"

import {z} from "zod";
import {RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log("registering values:", values);
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields." }
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    if (await getUserByEmail(email)) {
        return { error: "Email already in use." }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token, name)


    return { success: "Confirmation email sent."}
};