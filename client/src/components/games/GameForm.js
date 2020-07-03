import React, { useState, useContext, useEffect } from 'react';
import GameContext from '../../context/game/gameContext';

const GameForm = () => {
  const gameContext = useContext(GameContext);
  const { addGame, current, clearCurrent, updateGame } = gameContext;

  useEffect(() => {
    if (current !== null) {
      setGame(current);
    } else {
      setGame({
        user: '',
        course: '',
        stroke: [],
      });
    }
  }, [gameContext, current]);
  const [game, setGame] = useState({
    user: '',
    course: '',
    stroke: [],
  });

  const { user, course, stroke } = game;

  const onChange = (e) => setGame({ ...game, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addGame(game);
    } else {
      updateGame(game);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Game' : 'Add Game'}</h2>
      <input
        type="text"
        placeholder="User"
        name="user"
        value={user}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Course"
        name="course"
        value={course}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Strokes (Use spaces to seperate strokes)"
        name="stroke"
        value={stroke}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? 'Update Game' : 'Add Game'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default GameForm;
