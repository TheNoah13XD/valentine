'use client';

import { useEffect } from 'react';

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { spiral } = await import('ldrs');
            spiral.register();
        }
        getLoader();
    }, [])
    return (
        <l-mirage
            size="60"
            speed="2.5" 
            color="black" 
        />
    );
}
