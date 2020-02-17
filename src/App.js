import React, { useEffect } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { redirectAction, login, registerErrorAction, loginErrorAction } from './redux/actions/actions';

import Wrapper from './components/Wrapper';
import GamePageContainer from './components/GamePageContainer';
import LandingPageContainer from './components/LandingPageContainer';
import UserPageContainer from './components/UserPageContainer';
import UsersPageContainer from './components/UsersPageContainer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const mapStateToProps = state => ({
  redirect: state.redirect,
  loggedIn: state.loggedIn,
  username: state.username,
  registerError: state.registerError
});

const mapDispatchToProps = { redirectAction, login, registerErrorAction, loginErrorAction };

function App(props) {
  let socket = props.socket;
  useEffect(() => {
    socket.on('room created', (data) => {
      props.redirectAction(data);
    });
    socket.on('logged in', data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      props.login(data);
    });
    socket.on('register error', data => {
      console.log('register error');
      console.log(data);
      props.registerErrorAction(data);
    });
    socket.on('login error', data => {
      console.log('login error');
      console.log(data);
      props.loginErrorAction(data);
    });
    return () => {
      socket.removeAllListeners('room created');
      socket.removeAllListeners('logged in');
      socket.removeAllListeners('register error');
      socket.removeAllListeners('login error');
    }
  })
  console.log('props');
  console.log(props);
  return (
    <BrowserRouter>
      <Wrapper {...props}>
        {props.redirect && <Redirect to={`/${props.redirect.roomType}/${props.redirect.room}`} />}
        <Switch>
          <Route path='/' exact render={(props) => <LandingPageContainer {...props} socket={socket} />} />
          <Route path='/game/:roomNumber' render={(props) => <GamePageContainer {...props} socket={socket} />} />
          <Route path='/user/:username' render={(props) => <UserPageContainer {...props} socket={socket} />} />
          <Route path='/users/' render={(props) => <UsersPageContainer {...props} socket={socket} />} />
          {props.loggedIn ? '' : <Route path='/login' render={(props) => <LoginPage socket={socket} />} />}
          {props.loggedIn ? '' : <Route path='/register' render={(props) => <RegisterPage socket={socket} />} />}
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
