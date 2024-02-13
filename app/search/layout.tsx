'use client';

import { useUser } from "@/providers/ctx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "./loading";
import SearchPage from "./page";

const SearchLayout = () => {
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

    return <SearchPage />;
}
 
export default SearchLayout;
