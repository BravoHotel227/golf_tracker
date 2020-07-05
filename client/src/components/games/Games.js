import React, { Fragment, useContext } from 'react';
import {
  CCSTransition,
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
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
      <TransitionGroup>
        {(filtered || games).map((game) => (
          <CSSTransition key={game.id} timeout={500} classNames="item">
            <GameItem game={game} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Games;
