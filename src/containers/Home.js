import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import socketio from 'socket.io-client';

import { SOCKET_DATA } from '../reducers/socket';

const socketIO = socketio('http://192.168.0.143:4000');

const Home = () => {
    const [value, setValue] = useState('');
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const { socket } = useSelector(state => state.socket);
    
    useEffect(() => {
        socketIO.on('new message', function (data) {
            dispatch({
                type: SOCKET_DATA,
                data: data.message
            })
        });

        socketIO.on('user joined', (data) => {
            console.log(data.username + ' joined');
            dispatch({
                type: SOCKET_DATA,
                data: `${data.username}님이 들어 오셨습니다.`
            })
        });
    }, [])

    const onChangeValue = (e) => {
        setValue(e.target.value)
    }
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onClickSocket = () => {
        if(value !== '' && value.trim() !== ''){
            socketIO.emit('new message', value)
            // dispatch({
            //     type: SOCKET_DATA,
            //     data: value
            // })
            setValue('')
        }
    }

    const onKeyPressSocket = (e) => {
        if (e.keyCode === 13) {
            if (value !== '' && value.trim() !== '') {
            socketIO.emit('new message', value)
            // dispatch({
            //     type: SOCKET_DATA,
            //     data: value
            // })
            setValue('')
            }
        }
    }

    const onClickLogin = () => {
        if(username !== '' && username.trim() !== ''){
            socketIO.emit('add user', username);
            setUsername('')
            setLogin(true)
        }
    }

    const onKeyPressLogin = (e) => {
        if (e.keyCode === 13) {
            if (username !== '' && username.trim() !== '') {
                socketIO.emit('add user', username);
                setUsername('')
                setLogin(true)
            }
        }
    }
    return(
        <div className="App">
            {
                login ? (
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
                )
                :(
                 <div>
                    <h1>닉네임 입력</h1>
                    <TextField id="outlined-basic" variant="outlined" value={username} size="small" onChange={onChangeUsername} onKeyDown={onKeyPressLogin} />
                    <Button variant="outlined" className='btn-socket' color="primary" onClick={onClickLogin}>채팅 시작</Button>
                 </div>
                )
            }
        </div>
    )
}

export default Home;