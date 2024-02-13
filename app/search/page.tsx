'use client';

import { useUser } from "@/providers/ctx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const SearchPage = () => {
    const router = useRouter();
    const { setQuery } = useUser();
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        setSearch("");
    }, []);

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();

        if (search) {
            if (search === "valentine") {
                router.push("/valentine");
            } else {
                setQuery(search);
                router.push(`/results`);
            }
        }
    }

    return (
        <div className="flex flex-col space-y-6 justify-center items-center w-screen h-screen">
            <p className="text-2xl text-center w-2/3">Happy Valentine's Day, Nidhi!</p>
            <form onSubmit={handleSearch} className="w-2/3">
                <input
                    value={search}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                    type="search"
                    placeholder="search..."
                    autoComplete="off"
                    className="rounded-full bg-transparent border border-purple-600 outline-none w-full h-11 pl-4"
                />
            </form>
        </div>
    );
}
 
export default SearchPage;
