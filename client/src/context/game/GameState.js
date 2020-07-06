import React, { useReducer } from 'react';
import axios from 'axios';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
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

const GameState = (props) => {
  const initialState = {
    games: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Get Games
  const getGames = async () => {
    try {
      const res = await axios.get('/api/games');
      dispatch({ type: GET_GAMES, payload: res.data });
    } catch (err) {
      dispatch({ type: GAME_ERROR, payload: err.response.msg });
    }
  };

  // Add Game
  const addGame = async (game) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
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
    try {
      const res = await axios.post('/api/games', game, config);
      dispatch({ type: ADD_GAME, payload: res.data });
    } catch (err) {
      dispatch({ type: GAME_ERROR, payload: err.response.msg });
    }
  };
  // Delete Game
  const deleteGame = async (id) => {
    try {
      await axios.delete(`/api/games/${id}`);
      dispatch({ type: DELETE_GAME, payload: id });
    } catch (err) {
      dispatch({ type: GAME_ERROR, payload: err.response.msg });
    }
  };
  // Clear Games
  const clearGames = () => {
    dispatch({ type: CLEAR_GAMES });
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
  const updateGame = async (game) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (!Array.isArray(game.stroke)) {
      var str = game.stroke.split(',');
      game.stroke = str.map((st) => parseInt(st));
    }
    try {
      const res = await axios.put(`/api/games/${game._id}`, game, config);
      dispatch({ type: UPDATE_GAME, payload: res.data });
    } catch (err) {
      dispatch({ type: GAME_ERROR, payload: err.response.msg });
    }
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
        error: state.error,
        getGames,
        addGame,
        deleteGame,
        clearGames,
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
