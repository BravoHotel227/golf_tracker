import React, { useContext, useEffect } from 'react';
import Games from '../games/Games';
import GameForm from '../games/GameForm';
import GameFilter from '../games/GameFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

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
