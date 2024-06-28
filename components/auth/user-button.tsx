"use client"


import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {LogoutButton} from "@/components/auth/logout-button";
import {ExitIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {User} from "next-auth";
import {useCurrentUser} from "@/hooks/use-current-user";


export const UserButton = () => {
    const user = useCurrentUser()
    console.log({user})
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback>
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align={"end"}>
                <LogoutButton>
                    <DropdownMenuItem className="flex flex-row">
                        <ExitIcon className="size-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}