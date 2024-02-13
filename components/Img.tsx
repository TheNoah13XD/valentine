import Link from "next/link";

interface ImgProps {
    url: string;
    stylize?: string;
    onClick?: () => void;
}

const Img = ({ url, stylize, onClick }: ImgProps) => {
    return (
        <Link href={url} className={`flex justify-center items-center border-4 border-purple-600 rounded-xl ${stylize}`} target="_blank">
            <img src={url} alt="pic" className="rounded-xl max-w-full align-middle inline-block w-full h-full object-cover" />
        </Link>
    );
}
 
export default Img;
