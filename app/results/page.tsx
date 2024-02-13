import Results from "@/components/Results";

interface ResultsPageProps {
    search: string;        
}

const ResultsPage = ({ search }: ResultsPageProps) => {
    return (
        <>
            <Results tag={search} />
        </>
    );
}
 
export default ResultsPage;
