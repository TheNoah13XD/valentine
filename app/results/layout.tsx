'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/ctx";

import ResultsPage from "./page";
import Loading from "./loading";

const ResultsLayout = () => {
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

    return <ResultsPage />;
}
 
export default ResultsLayout;