import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return(
        <div>
            <input placeholder="" type="text" onChange={(e => {setName(e.target.value)})} />
            <input placeholder="" type="text" onChange={(e => {setRoom(e.target.value)})} />
            <Link to={`/chat?name=${name}&room=${room}`}><button>Join</button></Link>
        </div>
    )
}

export default Join;