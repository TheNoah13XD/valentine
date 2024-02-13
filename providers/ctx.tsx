'use client';

import { createContext, useContext, useState } from 'react';

interface UserContextProps {
    cracked: boolean;
    setCracked: (cracked: boolean) => void;
    query: string;
    setQuery: (search: string) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [cracked, setCracked] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    return (
        <UserContext.Provider value={{ cracked, setCracked, query, setQuery }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextProps {
    return useContext(UserContext) as UserContextProps;
}
