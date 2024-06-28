"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";

type Props = {
    href: string;
    label: string;
}

export const BackButton = ({href, label}: Props) => {


    return (
        <Button
            variant={"link"}
            size={"sm"}
            className="font-normal w-full"
            asChild
        >
            <Link href={href} >
                {label}
            </Link>
        </Button>
    )
}