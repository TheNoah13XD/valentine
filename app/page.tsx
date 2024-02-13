'use client';

import Loader from "@/components/Loader";
import { useUser } from "@/providers/ctx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
    const [password, setPassword] = useState<string>("");
    const [tries, setTries] = useState<number>(0);
    const [body, setBody] = useState<string>("");

	const router = useRouter();
	const { cracked, setCracked } = useUser();

	useEffect(() => {
		if (cracked) {
			router.push("/search");
		}
	}, [cracked]);

    const correctPassword = process.env.NEXT_PUBLIC_AUTH_PASS;

    const proceed = (event: FormEvent) => {
        event.preventDefault();
        if (password === correctPassword) {
            setTries(0);
			setCracked(true);
        } else {
            setTries(tries + 1);
        }
    }

    useEffect(() => {
        if (tries === 3) {
            setBody("alright, here's a clue for u. it's a place that you know. try again huehuehuehue.");
        } else if (tries === 4) {
            setBody("dumbfuck, i knew it. here's another clue = pfp");
        } else if (tries === 5) {
            setBody("if you still cant find the pass, i should rethink my life choices. here's one last clue = snapsquad");
        } else if (tries > 5) {
            setBody(`wtf. heres the password dumbfuck - ${correctPassword}`);
        }
    }, [tries, correctPassword]);

    const forgotPass = async () => {
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
      
            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Error sending email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

	return (
		<>
			<div className="flex justify-center items-center w-screen h-screen">
				<form onSubmit={proceed} className="flex-col space-y-4">
					<div className="flex space-x-4">
						<p className="text-2xl text-white">{`HA! Enter password`}</p>
						<button className="text-2xl  text-white hover:text-neutral-100" type="submit">{`->`}</button>
					</div>
					
					<input
						value={password}
						onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
						type="password"
						placeholder="password"
                        autoComplete="off"
						className="bg-transparent border-b border-purple-600 outline-none w-full h-14"
					/>

					{tries > 2 && (
						<div className="flex justify-end w-full pt-4">
							<button className="bg-purple-600 hover:bg-purple-800 active:scale-[0.99] p-2" onClick={forgotPass}>it went over my head!</button>
						</div>
					)}
				</form>
			</div>
		</>
	);
}
