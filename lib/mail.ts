import {Resend} from "resend";
import {EmailTemplate} from "@/components/email/email-template";
import {ResetPassword} from "@/components/email/reset-password";
import {TwoFactorEmail} from "@/components/email/two-factor-email";


const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        react: EmailTemplate({name: name, link: confirmLink})
    })
}

export const sendPasswordResetEmail = async (email: string, token: string, name: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        react: ResetPassword({name: name, link: resetLink})
    })
}

export const sendTwoFactorEmail = async (email: string, token: string, name: string) => {
    await resend.emails.send({
        from: "Manuel from Consilium <onboarding@resend.dev>",
        to: email,
        subject: "2FA Code",
        react: TwoFactorEmail({code: token, name: name})
    })
}