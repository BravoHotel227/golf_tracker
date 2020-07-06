import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import GameContext from '../../context/game/gameContext';
import CourseContext from '../../context/course/courseContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const { clearGames } = gameContext;
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    clearGames();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/courses">Courses</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Golf Tracker',
  icon: 'fas fa-golf-ball',
};

export default Navbar;
