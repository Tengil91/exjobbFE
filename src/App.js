import React, { useEffect } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { redirectAction, login } from './redux/actions/actions';

import GamePageContainer from './components/GamePageContainer';
import Wrapper from './components/Wrapper';
import LandingPageContainer from './components/LandingPageContainer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const mapStateToProps = state => ({
  redirect: state.redirect,
  loggedIn: state.loggedIn,
  username: state.username
});

const mapDispatchToProps = { redirectAction, login };

function App(props) {
  let socket = props.socket;
  socket.on('room created', (data) => {
    //redirecta till rummet
    console.log(data);
    props.redirectAction(data);
  });
  socket.on('logged in', data => {
    console.log('logged in');
    console.log(data);
    props.login(data);
  });
  console.log('props');
  console.log(props);
  return (
    <BrowserRouter>
      <Wrapper {...props}>
        {props.redirect && <Redirect to={`/${props.redirect.roomType}/${props.redirect.room}`} />}
        <Switch>
          <Route path='/' exact render={(props) => <LandingPageContainer {...props} socket={socket} />} />
          <Route path='/games/:roomNumber' render={(props) => <GamePageContainer {...props} socket={socket} />} />
          {props.loggedIn ? '' : <Route path='/login' render={(props) => <LoginPage socket={socket} />} />}
          {props.loggedIn ? '' : <Route path='/register' render={(props) => <RegisterPage socket={socket} />} />}
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
