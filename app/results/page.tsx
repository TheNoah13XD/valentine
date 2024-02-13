"use client";

import Results from "@/components/Results";

import { useUser } from "@/providers/ctx";

const ResultsPage = () => {
    const { query } = useUser();

    return (
        <>
            <Results tag={query} />
        </>
    );
}
 
export default ResultsPage;
