import {ReactNode} from "react";
import {Navbar} from "@/app/(protected)/_components/navbar";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";

type Props = {
    children: ReactNode
}
const ProtectedLayout = async ({children}: Props) => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-300 to-blue-800">
                <Navbar />
                {children}
            </div>
        </SessionProvider>
    )
}

export default ProtectedLayout;