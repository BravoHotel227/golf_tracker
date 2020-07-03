import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/game/gameContext';

const GameItem = ({ game }) => {
  const gameContext = useContext(GameContext);
  const { deleteGame, setCurrent, clearCurrent } = gameContext;

  const { id, user, stroke, course, date, par } = game;

  const onDelete = () => {
    deleteGame(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{date}</h3>
      <ul className="list">
        <li>
          <strong>Player: </strong>
          {user}
        </li>
        <li>
          <strong>Course: </strong>
          {course}
        </li>
        <li>
          <strong>Strokes: </strong>
          {stroke.map((str) => str + ' ')}
        </li>
        <li>
          <strong>Total: </strong>
          {stroke.reduce((a, b) => a + b, 0)}
        </li>
        <li>
          <strong>Par: </strong>
          {par}
        </li>
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(game)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameItem;
