"use client"

import {logout} from "@/actions/logout";

type Props = {
    children?: React.ReactNode
}
export const LogoutButton = (
    {children}: Props
) => {

    const onClick = () => {
        logout()
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}