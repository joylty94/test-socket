import { combineReducers } from 'redux';
import socket from './socket';

const rootReducers = combineReducers({
    socket
});

export default rootReducers;