'use client';

import { useReward } from 'react-rewards';
import { useState } from "react";

const ValentinePage = () => {
    const [isValentine, setIsValentine] = useState<boolean | undefined>(undefined);
    const [noButtonPosition, setNoButtonPosition] = useState<{ top: string, left: string }>({ top: '50%', left: '50%' });
    const [weird, setWeird] = useState<boolean>(false);
    const { reward } = useReward('rewardId', 'confetti');

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

    const handleValentine = async () => {
        setIsValentine(true);
        reward();
        const device = navigator.userAgent;
        const region = Intl.DateTimeFormat().resolvedOptions().timeZone;
        await sendAnalytics(`SHE SAID YES on ${new Date().toLocaleString()} from ${device} in ${region}`);
    }

    const handleNo = () => {
        setWeird(true);
        setNoButtonPosition({
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`
        });
    }

    return (
        <>
            <div className="flex flex-col space-y-12 justify-center items-center w-screen h-screen">
                <p className="text-4xl text-center w-2/3">will you be my Valentine??</p>
                <div className="flex-row justify-center items-center space-x-20">
                    <button className="bg-purple-500 rounded-full px-6 py-1 text-2xl" onClick={handleValentine}>yes</button>
                    <span id="rewardId" /> 🎉
                    <button 
                        className={`bg-red-500 rounded-full px-6 py-1 text-2xl ${weird ? 'absolute' : ''}`} 
                        style={{ top: noButtonPosition.top, left: noButtonPosition.left }} 
                        onClick={handleNo}
                    >
                        no
                    </button>
                </div>
                {isValentine && <p className='text-3xl text-center bg-purple-500 p-2'>SHE SAID YES!!! I LOVE YOU NIDHI!!!</p>}
            </div>
        </>
    );
}
 
export default ValentinePage;
