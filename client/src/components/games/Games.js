import React, { Fragment, useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import GameItem from './GameItem';
import Spinner from '../layout/Spinner';
import GameContext from '../../context/game/gameContext';

const Games = () => {
  const gameContext = useContext(GameContext);

  const { games, filtered, getGames, loading } = gameContext;

  useEffect(() => {
    getGames();
    //eslint-disable-next-line
  }, []);

  if (games !== null && games.length === 0 && !loading) {
    return <h4>Please add a game</h4>;
  }

  return (
    <Fragment>
      {(games !== null) & !loading ? (
        <TransitionGroup>
          {(filtered || games).map((game) => (
            <CSSTransition key={game._id} timeout={500} classNames="item">
              <GameItem game={game} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Games;
