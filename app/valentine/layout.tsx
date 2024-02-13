'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/ctx";

import Loading from "./loading";
import ValentinePage from "./page";

const ValentineLayout = () => {
    const router = useRouter();
    const { cracked } = useUser();

    useEffect(() => {
        if (cracked === false) {
            router.push("/");
        }
    }, [cracked]);

    if (cracked === undefined || cracked === false) {
        return <Loading />;
    }

    return <ValentinePage />;
}
 
export default ValentineLayout;
