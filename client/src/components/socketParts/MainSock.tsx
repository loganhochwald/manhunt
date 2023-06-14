import React, { useState, createContext, ReactNode } from 'react';

interface MainContextType {
  name: string;
  room: string;
  setName: (name: string) => void;
  setRoom: (room: string) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider = ({ children }: MainProviderProps) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <MainContext.Provider value={{ name, room, setName, setRoom }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
