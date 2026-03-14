import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getUserName, setUserName } from './user-store';

interface UserContextValue {
  name: string | null;
  isLoading: boolean;
  needsName: boolean;
  saveName: (name: string) => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  name: null,
  isLoading: true,
  needsName: false,
  saveName: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserName().then((stored) => {
      setName(stored);
      setIsLoading(false);
    });
  }, []);

  const saveName = useCallback(async (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    await setUserName(trimmed);
    setName(trimmed);
  }, []);

  return (
    <UserContext.Provider
      value={{ name, isLoading, needsName: !isLoading && !name, saveName }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
