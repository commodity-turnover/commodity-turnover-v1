import { useEffect } from 'react';
import io from 'socket.io-client';

import styles from './messagesPage.module.scss'


const socket = io('http://localhost:3001');

const MessagesPage = () => {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO');
    });
  }, []);
  
  return (
    <div className={`main-content ${styles.messagesPage}`}>
      <h1>Socket.IO React App</h1>
    </div>
  )
}

export default MessagesPage