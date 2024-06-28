import { currentRole } from "@/lib/auth";
import {NextResponse} from "next/server";
import {UserRole} from "@prisma/client";


export async function GET() {
    const role = await currentRole()

    if (role === UserRole.ADMIN) {
        return new NextResponse(null, { status: 200 })
    }
    return new NextResponse(null, { status: 403 })
}