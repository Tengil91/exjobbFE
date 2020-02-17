//importera actions
import { REDIRECT_ACTION, SET_PLAYERS, SET_PLAYING, UPDATE_TABLE, UPDATE_LANDING_PAGE, REMOVE_REDIRECT, LOGIN, UPDATE_USER_PAGE, UPDATE_USERS_PAGE, REGISTER_ERROR, LOGIN_ERROR } from '../actions/actions';

//deklarera initialState
let initialState = {
  
};

//deklarera rootReducer
let rootReducer = (state = initialState, action) => {
  switch(action.type){
    case REDIRECT_ACTION: 
      return {...state, redirect: action.redirect};
    case SET_PLAYERS:
      return {...state, black: action.black, white: action.white};
      case SET_PLAYING:
        return {...state, playing: action.playing};
      case UPDATE_TABLE:
        let tableChanges = { ...action};
        delete tableChanges.type;
        return {...state, ...tableChanges};
      case UPDATE_LANDING_PAGE:
        let landingChanges = { ...action};
        delete landingChanges.type;
        return {...state, ...landingChanges};
      case UPDATE_USER_PAGE:
        let userPageChanges = { ...action};
        delete userPageChanges.type;
        return {...state, ...userPageChanges};
      case UPDATE_USERS_PAGE:
        let usersPageChanges = { ...action};
        delete usersPageChanges.type;
        return {...state, ...usersPageChanges};
      case REMOVE_REDIRECT:
        return { ...state, redirect: null};
      case REGISTER_ERROR:
        return {
          ...state,
          registerError: action.registerError
        };
      case LOGIN_ERROR:
        return {
          ...state,
          loginError: action.loginError
        };
      case LOGIN:
        return {
          ...state,
          loggedIn: action.loggedIn,
          username: action.username
        };
    default:
      return state;
  }
}

//exportera rootReducer
export default rootReducer;