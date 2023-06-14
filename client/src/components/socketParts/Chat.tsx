import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { MainContext } from './MainSock'
import { SocketContext } from './Socket'
import { UsersContext } from './UsersSock'

const Chat = () => {
    const { name, room, setName, setRoom } = useContext(MainContext)
    const socket = useContext(SocketContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const { users } = useContext(UsersContext)
    const history = useHistory()

    useEffect(() => { if (!name) return history.push('/home') }, [history, name])


    useEffect(() => {
        socket.on("message", msg => {
            setMessages(messages => [...messages, msg]);
        })

        socket.on("notification", notif => {

 console.log('notification', notif)
        })
    }, [socket])


    const handleSendMessage = () => {
        socket.emit('sendMessage', message, () => setMessage(''))
        setMessage('')
    }

    return (
      <div className='room'>
        <h4 className='heading'>
          <div className='menu'>
            <button className='menu-button'>menu
            </button>
            <div className='menu-list'>
              {users &&
                users.map((user) => {
                  return (
                    <div className='menu-item' key={user.id}>
                      <p className='menu-item-text'>{user.name}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className='room-info'>
            <h2 className='room-name'>{room.slice(0, 1).toUpperCase() + room.slice(1)}</h2>
            <div className='user-info'>
              <p className='username'>{name}</p>
              <div className='status-indicator'></div>
            </div>
          </div>
        </h4>

        <div className='messages'>
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <div key={i} className={`message ${msg.user === name ? "my-message" : ""}`}>
                <p className='user'>{msg.user}</p>
                <p className='msg'>{msg.text}</p>
              </div>
            ))
          ) : (
            <div className='no-messages'>
              <div className='no-messages-line'></div>
              <p className='no-messages-text'>No messages</p>
              <div className='no-messages-line'></div>
            </div>
          )}
        </div>
        <div className='form'>
          <input type="text" placeholder='Enter Message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className='send-button' onClick={handleSendMessage} disabled={message === ''}>send
          </button>
        </div>
      </div>
    );}

export default Chat