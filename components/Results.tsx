'use client';

import { useRouter } from "next/navigation";
import { useUser } from "@/providers/ctx";

import Img from "./Img";
import images from '../app/data.json';

interface ResultsProps {
    tag: string;
}

const Results = ({ tag }: ResultsProps) => {
    const router = useRouter();
    const { setQuery } = useUser();

    const filteredImages = images.filter((image) => {
        return image.tags.includes(tag);
    });

    const handleBack = () => {
        setQuery("");
        router.push("/search");
    }

    return (
        <>
            {filteredImages.length === 0 ? (
                <div className="flex flex-col space-y-4 justify-center items-center w-screen h-screen">
                    <p className="text-2xl text-center w-2/3">Nope, Find the right keywords.</p>
                    <button onClick={handleBack} className="hover:text-neutral-200">{`Go Back ->`}</button>
                </div>
            ) : (
                <div className="w-3/4 mx-auto my-20">
                    <div className="grid gap-4 grid-cols-custom auto-rows-custom grid-flow-dense">
                        {filteredImages.map((image, index) => (
                            <Img key={index} url={image.url} stylize="cursor-pointer" />
                        ))}
                    </div>
                    <button onClick={handleBack} className="absolute bottom-4 right-4 hover:text-neutral-200">{`Go Back ->`}</button>
                </div>
            )}
        </>
    );
}
 
export default Results;
