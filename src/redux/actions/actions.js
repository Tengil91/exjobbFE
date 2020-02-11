export const REDIRECT_ACTION = 'REDIRECT';
export const REMOVE_REDIRECT = 'REMOVE_REDIRECT';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_PLAYING = 'SET_PLAYING';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const UPDATE_LANDING_PAGE = 'UPDATE_LANDING_PAGE';
export const UPDATE_USER_PAGE = 'UPDATE_USER_PAGE';
export const UPDATE_USERS_PAGE = 'UPDATE_USERS_PAGE';
export const LOGIN = 'LOGIN';

export function redirectAction(redirect){
  return {
    type: REDIRECT_ACTION,
    ...redirect
  };
}
export function removeRedirect(){
  return {
    type: REMOVE_REDIRECT
  };
}
export function setPlayers(players){
  return {
    type: 'SET_PLAYERS',
    ...players
  };
}
export function setPlaying(playing){
  return {
    type: 'SET_PLAYING',
    ...playing
  };
}
export function updateTable(data){
  return {
    type: 'UPDATE_TABLE',
    ...data
  };
}
export function updateLandingPage(data){
  return {
    type: UPDATE_LANDING_PAGE,
    ...data
  }
}
export function updateUserPage(data){
  return {
    type: UPDATE_USER_PAGE,
    ...data
  }
}
export function updateUsersPage(data){
  return {
    type: UPDATE_USERS_PAGE,
    ...data
  }
}
export function login(data){
  return {
    type: LOGIN,
    ...data
  }
}