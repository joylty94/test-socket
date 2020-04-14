import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import socketio from 'socket.io-client';

import { SOCKET_DATA } from '../reducers/socket';

const socketIO = socketio.connect('http://192.168.0.143:4000');

const Home = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const { socket } = useSelector(state => state.socket);
    
    useEffect(() => {
        socketIO.on('chat message', function (msg) {
            dispatch({
                type: SOCKET_DATA,
                data: msg
            })
        });
    }, [])

    const onChangeValue = (e) => {
        setValue(e.target.value)
    }

    const onClickSocket = () => {
        if(value !== '' && value.trim() !== ''){
            socketIO.emit('chat message', value)
            setValue('')
        }
    }

    const onKeyPressSocket = (e) => {
        if (e.keyCode === 13) {
            if (value !== '' && value.trim() !== '') {
            socketIO.emit('chat message', value)
            setValue('')
            }
        }
    }
    return(
        <div className="App">
            <div className="socket-wrap">
                <div className="socket-list">
                    {
                        socket && socket.length > 0 && socket.map((c, i) => {
                            return (
                                <ListItem key={i}>
                                    <ListItemText primary={c} />
                                </ListItem>
                            )
                        })
                    }
                </div>
                <div className="socket-form">
                    <TextField id="outlined-basic" variant="outlined" value={value} size="small" onChange={onChangeValue} onKeyDown={onKeyPressSocket} />
                    <Button variant="outlined" className='btn-socket' color="primary" onClick={onClickSocket}>socket</Button>
                </div>
            </div>
        </div>
    )
}

export default Home;