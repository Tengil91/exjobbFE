export const REDIRECT_ACTION = 'REDIRECT';
export const REMOVE_REDIRECT = 'REMOVE_REDIRECT';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_PLAYING = 'SET_PLAYING';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const UPDATE_LANDING_PAGE = 'UPDATE_LANDING_PAGE';
export const UPDATE_USER_PAGE = 'UPDATE_USER_PAGE';
export const UPDATE_USERS_PAGE = 'UPDATE_USERS_PAGE';
export const LOGIN = 'LOGIN';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function redirectAction(redirect){
  return {
    type: REDIRECT_ACTION,
    ...redirect
  };
}
export function removeRedirect(){
  console.log('object');
  return {
    type: REMOVE_REDIRECT,
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
export function registerErrorAction(data){
  return {
    type: REGISTER_ERROR,
    ...data
  }
}
export function loginErrorAction(data){
  return {
    type: LOGIN_ERROR,
    ...data
  }
}