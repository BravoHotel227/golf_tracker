import React, { Fragment, useContext } from 'react';
import GameItem from './GameItem';
import GameContext from '../../context/game/gameContext';

const Games = () => {
  const gameContext = useContext(GameContext);

  const { games, filtered } = gameContext;

  if (games.length === 0) {
    return <h4>Please add a game</h4>;
  }

  return (
    <Fragment>
      {(filtered || games).map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </Fragment>
  );
};

export default Games;
