// import React from 'react';
import {LoginButton} from '../Auth0/LoginButton';
import {SignupButton} from '../Auth0/SignupButton';

import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { MainContext } from '../socketParts/MainSock';
import { SocketContext } from '../socketParts/Socket'
import { UsersContext } from '../socketParts/UsersSock';



const LandingPage = () => {

  const socket = useContext(SocketContext);
  const { name, setName, room, setRoom } = useContext(MainContext);
  const history = useHistory();
  const { setUsers } = useContext(UsersContext);

  // Checks to see if there's a user already present
  useEffect(() => {
    socket.on("users", (users: any[]) => {
      setUsers(users);
    });
  }, [socket, setUsers]);

    // Emits the login event and if successful redirects to home and saves user data
    const handleClick = () => {
      socket.emit('login', { name, room }, (error: string | null) => {
        if (error) {
          console.log(error);
        }
        history.push('/chat');

      });
    };


  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <LoginButton/>
      <SignupButton/>
      <button className="chat-button" onClick={handleClick}>Chat</button>
    </div>
  )
};

export default LandingPage
