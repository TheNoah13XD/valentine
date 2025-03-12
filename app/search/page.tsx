'use client';

import Alert from "@/components/Alert";
import { useUser } from "@/providers/ctx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const SearchPage = () => {
    const router = useRouter();
    const { setQuery } = useUser();
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string>("");

    const sendAnalytics = async (text: string) => {
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to: 'broken.personal.1211@gmail.com', text }),
            });
    
            if (!response.ok) throw new Error('Failed to send email');
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    };

    useEffect(() => {
        setSearch("");
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSearch = async (event: FormEvent) => {
        event.preventDefault();

        if (search) {
            setError("");
            if (search === "valentine") {
                const device = navigator.userAgent;
                const region = Intl.DateTimeFormat().resolvedOptions().timeZone;
                await sendAnalytics(`found the valentine page on ${new Date().toLocaleString()} from ${device} in ${region}`);
                router.push("/valentine");
            } else {
                const device = navigator.userAgent;
                const region = Intl.DateTimeFormat().resolvedOptions().timeZone;
                await sendAnalytics(`searched for ${search} on ${new Date().toLocaleString()} from ${device} in ${region}`); 
                setQuery(search);
                router.push(`/results`);
            }
        } else {
            setError("enter something idiot");
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

            {error && <Alert message={error} view action={() => setError("")} />}
        </div>
    );
}
 
export default SearchPage;
