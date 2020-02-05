//importera actions
import { REDIRECT_ACTION, SET_PLAYERS, SET_PLAYING, UPDATE_TABLE, UPDATE_LANDING_PAGE, REMOVE_REDIRECT } from '../actions/actions';

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
      case REMOVE_REDIRECT:
        let newState = { ...state};
        delete newState.redirect;
        return newState;
    default:
      return state;
  }
}

//exportera rootReducer
export default rootReducer;