import {
  ADD_GAME,
  DELETE_GAME,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GAME,
  FILTER_GAMES,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload),
      };
    case UPDATE_GAME:
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.id ? action.payload : game
        ),
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
    default:
      return state;
  }
};
