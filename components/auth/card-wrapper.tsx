"use client"

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {Social} from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";

type Props = {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref, showSocial}: Props) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>
        </Card>
    )
}