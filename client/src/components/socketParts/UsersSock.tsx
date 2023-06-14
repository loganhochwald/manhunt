import React, { useState, createContext, ReactNode } from 'react';

interface UsersContextType {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<any[]>([]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
