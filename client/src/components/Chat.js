import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'

let socket


const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io("localhost:5000");
        socket.emit('join', {name: name, room: room}, () => {
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [location]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = () => {
        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }
    console.log(messages)
    return(
        <div>
            <input 
                value={message} 
                onChange={(e) => {setMessage(e.target.value)}}
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
            />
        </div>
    )
}

export default Chat;