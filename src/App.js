import React, {useState, useEffect} from 'react';
import './App.css';
import socketio from 'socket.io-client';
import { TextField, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const socket = socketio.connect('http://localhost:4000');

function App() {
  const [value, setValue] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat message', function (msg) {
      console.log('mag',msg)
      setChat(prev => [...prev, msg])
    });
  },[])

  const onChangeValue = (e) => {
    setValue(e.target.value)
  }

  const onClickSocket = () =>{
    socket.emit('chat message', value)
    setValue('')
  }

  return (
    <div className="App">
      <div className="socket-wrap">
        <div className="socket-list">
          {
            chat && chat.length > 0 && chat.map((c, i) => {
              return(
                <ListItem key={i}>
                  <ListItemText primary={c} />
                </ListItem>
              )
            }) 
          }
        </div>
        <div className="socket-form">
          <TextField id="outlined-basic" variant="outlined" value={value} size="small" onChange={onChangeValue} />
          <Button variant="outlined" className='btn-socket' color="primary" onClick={onClickSocket}>socket</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
