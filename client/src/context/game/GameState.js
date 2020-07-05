import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import {
  ADD_GAME,
  DELETE_GAME,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GAME,
  FILTER_GAMES,
  CLEAR_FILTER,
} from '../types';

const GameState = (props) => {
  const initialState = {
    games: [
      {
        stroke: [4, 4, 6, 6, 6, 8, 4, 6, 7],
        id: '1',
        user: 'Ben Harrison',
        course: 'Canterbury Bankstown',
        par: 33,
        date: '27-04-2020',
      },
      {
        stroke: [4, 6, 3, 7, 6, 7, 5, 5, 5],
        id: '2',
        user: 'Ben Harrison',
        course: 'Canterbury Bankstown',
        par: 33,
        date: '20-04-2020',
      },
      {
        stroke: [4, 4, 3, 6, 7, 7, 4, 6, 6, 5, 4, 4, 5, 5, 5, 5, 5, 6],
        id: '3',
        user: 'Ben Harrison',
        course: 'Canterbury Bankstown',
        par: 66,
        date: '16-04-2020',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Add Game
  const addGame = (game) => {
    game.id = uuidv4();
    if (!Array.isArray(game.stroke)) {
      var str = game.stroke.split(' ');
      game.stroke = str.map((st) => parseInt(st));
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    game.date = today;
    game.par = 33;
    dispatch({ type: ADD_GAME, payload: game });
  };
  // Delete Game
  const deleteGame = (id) => {
    dispatch({ type: DELETE_GAME, payload: id });
  };
  // Set Current Game
  const setCurrent = (game) => {
    dispatch({ type: SET_CURRENT, payload: game });
  };
  // Clear Current Game
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Game
  const updateGame = (game) => {
    console.log(game);
    if (!Array.isArray(game.stroke)) {
      var str = game.stroke.split(',');
      game.stroke = str.map((st) => parseInt(st));
    }
    dispatch({ type: UPDATE_GAME, payload: game });
  };
  // Filter Games
  const filterGames = (text) => {
    dispatch({ type: FILTER_GAMES, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <GameContext.Provider
      value={{
        games: state.games,
        current: state.current,
        filtered: state.filtered,
        addGame,
        deleteGame,
        setCurrent,
        clearCurrent,
        updateGame,
        filterGames,
        clearFilter,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
