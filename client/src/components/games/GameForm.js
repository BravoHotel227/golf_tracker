import React, { useState, useContext, useEffect, createContext } from 'react';
import GameContext from '../../context/game/gameContext';
import CourseContext from '../../context/course/courseContext';
const GameForm = () => {
  const gameContext = useContext(GameContext);
  const courseContext = useContext(CourseContext);

  const { addGame, current, clearCurrent, updateGame } = gameContext;
  const { courses, getCourses } = courseContext;

  useEffect(() => {
    getCourses();
    if (current !== null) {
      setGame(current);
    } else {
      setGame({
        course: '',
        stroke: [],
      });
    }
  }, [gameContext, current]);
  const [game, setGame] = useState({
    course: '',
    stroke: [],
  });

  const { course, stroke } = game;

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
      <select placeholder="Select a course" name="course" onChange={onChange}>
        <option value={course}>{course ? course : 'Select one...'}</option>
        {courses &&
          courses.map((crs) => (
            <option key={crs._id} value={crs.name}>
              {crs.name}
            </option>
          ))}
      </select>
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
