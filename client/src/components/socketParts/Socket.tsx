import React, { createContext, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const ENDPOINT = 'http://localhost:3666';
  const socket: Socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
