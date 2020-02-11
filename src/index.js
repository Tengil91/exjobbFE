import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store/store';

let io = require('socket.io-client');
let socket = io(':3001');
let token = localStorage.getItem('token');
let username = localStorage.getItem('username');

socket.on('connection', () => {
  if(token && username){
    socket.emit('login', {
      token,
      username
    });
  }
  ReactDOM.render(
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  , document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});

