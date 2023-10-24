import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://127.0.0.1:4000', { transports : ['websocket'] }); 

const SocketComponent = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [drawTime, setDrawTime] = useState(0);

  useEffect(() => {
    socket.on('remainingTime', (data) => {
      setRemainingTime(data);
    });
    socket.on('drawTime', (data) => {
      setDrawTime(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Remaining Time: {remainingTime}</p>
      <p>Draw Time: {drawTime}</p>
      {/* Your remaining component JSX */}
    </div>
  );
};

export default SocketComponent;