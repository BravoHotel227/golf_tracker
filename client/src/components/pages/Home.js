import React from 'react';
import Games from '../games/Games';
import GameForm from '../games/GameForm';
import GameFilter from '../games/GameFilter';

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <GameForm />
      </div>
      <div>
        <GameFilter />
        <Games />
      </div>
    </div>
  );
};

export default Home;
