import React, { useContext, useRef, useEffect } from 'react';
import GameContext from '../../context/game/gameContext';

const GameFilter = () => {
  const gameContext = useContext(GameContext);
  const { filterGames, clearFilter, filtered } = gameContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const text = useRef('');
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterGames(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        className="filter"
        ref={text}
        type="text"
        placeholder="Filter Games..."
        onChange={onChange}
      ></input>
    </form>
  );
};

export default GameFilter;
