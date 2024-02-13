interface AlertProps {
    view: boolean;
    message: string;
    action?: () => void;
}

const Alert = ({ view, message, action }: AlertProps) => {
    const display = view ? "bottom-20" : "hidden";

    return (
        <>
            <div className={`flex justify-between items-center absolute ${display} self-center bg-purple-600 rounded-full w-96 h-12 px-6`}>
                <p>{message}</p>
                <button onClick={action}>X</button>
            </div>
        </>
    );
}
 
export default Alert;
