import React, { useState, useEffect, useRef} from 'react';
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
    const [ socketData, setSocketData ] = useState([])
    const [ socketData2, setSocketData2 ] = useState([])

    const isInitialMount = useRef(true);
    
    useEffect(() => {
        // if (isInitialMount.current) {
        //     console.log('mount')
        //     isInitialMount.current = false;
        //     socketIO.on('new message', function (data) {
        //         // dispatch({
        //         //     type: SOCKET_DATA,
        //         //     data: data.message
        //         // })
        //         console.log('data', data)
        //         setSocketData(prev => [...prev, data])
        //         // setSocketData2([...socketData])
        //     });
        // } else {
        //     console.log('update')
        //     setSocketData2(socketData)
        // }

        console.log('mount')
        socketIO.on('new message', function (data) {
            // dispatch({
            //     type: SOCKET_DATA,
            //     data: data.message
            // })
            console.log('data', data)
            setSocketData(prev => [...prev, data])
            setSocketData2(prev => [...socketData])
        });


        // socketIO.on('user joined', (data) => {
        //     console.log(data.username + ' joined');
        //     dispatch({
        //         type: SOCKET_DATA,
        //         data: `${data.username}님이 들어 오셨습니다.`
        //     })
        // });

        return () => {
            socketIO.off('new message')
        }
    }, [socketData])

    const onChangeValue = (e) => {
        setValue(e.target.value)
    }
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onClickSocket = () => {
        if(value !== '' && value.trim() !== ''){
            socketIO.emit('new message', value)
            setValue('')
        }
    }

    const onKeyPressSocket = (e) => {
        if (e.keyCode === 13) {
            if (value !== '' && value.trim() !== '') {
            socketIO.emit('new message', value)
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

    console.log('socketData', socketData)
    console.log('socketData2', socketData2)

    return(
        <div className="App">
            {
                login ? (
                    <div className="socket-wrap">
                        <div className="socket-list">
                            {
                                socketData && socketData.length > 0 && socketData.map((c, i) => {
                                    return (
                                        <ListItem key={i}>
                                            <ListItemText primary={`${c.username} : ${c.message}`} />
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