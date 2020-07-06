import {
  ADD_GAME,
  GAME_ERROR,
  DELETE_GAME,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GAME,
  FILTER_GAMES,
  CLEAR_FILTER,
  GET_GAMES,
  CLEAR_GAMES,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        loading: false,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [action.payload, ...state.games],
        loading: false,
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game._id !== action.payload),
        loading: false,
      };
    case CLEAR_GAMES:
      return {
        ...state,
        games: null,
        filtered: null,
        error: null,
        current: null,
      };
    case UPDATE_GAME:
      return {
        ...state,
        games: state.games.map((game) =>
          game._id === action.payload._id ? action.payload : game
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_GAMES:
      return {
        ...state,
        filtered: state.games.filter((game) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return game.date.match(regex) || game.course.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case GAME_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
