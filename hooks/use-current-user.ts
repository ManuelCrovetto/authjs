import {useSession} from "next-auth/react";
import {router} from "next/client";
import {useRouter} from "next/navigation";


export const useCurrentUser = () => {
    const session = useSession()
    return session.data?.user
}