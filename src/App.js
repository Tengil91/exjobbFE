import React, { useEffect } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { redirectAction } from './redux/actions/actions';

import GamePageContainer from './components/GamePageContainer';
import Wrapper from './components/Wrapper';
import LandingPageContainer from './components/LandingPageContainer';

const mapStateToProps = state => ({
  redirect: state.redirect
});

const mapDispatchToProps = { redirectAction };

function App(props) {
  let socket = props.socket;
  socket.on('room created', (data) => {
    //redirecta till rummet
    console.log(data);
    props.redirectAction(data);
    
  });
  return (
    <BrowserRouter>
      <Wrapper>
        {props.redirect && <Redirect to={`/${props.redirect.roomType}/${props.redirect.room}`} />}
        <Switch>
          <Route path='/' exact render={(props) => <LandingPageContainer {...props} socket={socket} />} />
          <Route path='/games/:roomNumber' render={(props) => <GamePageContainer {...props} socket={socket} />} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
