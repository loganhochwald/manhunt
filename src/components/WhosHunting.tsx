import React, { useContext } from 'react';
import SocketContext from '../contexts/Socket/SocketContext';
import { ButtonFirstPick, ButtonPickAgain } from '../components/Buttons'

const WhosHunting: React.FunctionComponent = () => {
  const { games } = useContext(SocketContext).SocketState;

  return (
    <div>
      {games.length > 0 && games[0].hunted.length > 0 ? (
        <div>
          <div>Player {games[0].hunted}, You're Being Hunted</div>
          <ButtonPickAgain />
        </div>
      ) : (
        <ButtonFirstPick />
      )}
    </div>
  );
};

export default WhosHunting;
