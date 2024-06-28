"use client"

//This component is called LoginButton but could be called LoginComponent easily.

import {useRouter} from "next/navigation";

type Props = {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;

}

export const LoginButton = ({children, mode = "redirect", asChild}: Props) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}