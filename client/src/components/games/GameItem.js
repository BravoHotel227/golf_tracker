import React, { useContext, createElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import GameContext from '../../context/game/gameContext';
const GameItem = ({ game }) => {
  const gameContext = useContext(GameContext);

  const { deleteGame, setCurrent, clearCurrent } = gameContext;

  const { _id, stroke, course, date } = game;

  const formDate = (date) => {
    var dateStr = new Date(date);
    return (
      dateStr.getDate() + '/' + dateStr.getMonth() + '/' + dateStr.getFullYear()
    );
  };

  const onDelete = () => {
    deleteGame(_id);
    clearCurrent();
  };
  const runTable = (stroke) => {
    var strArr = [];
    for (let i = 0; i < 18; i++) {
      if (stroke[i] !== undefined) {
        strArr.push(stroke[i]);
      } else if (stroke[i] === undefined || !stroke[i].isInteger()) {
        strArr.push('');
      }
    }
    console.log(strArr);
    return strArr;
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{formDate(date)}</h3>
      <ul className="list">
        <li>
          <strong>Course: </strong>
          {course}
        </li>
        <li>
          <table>
            <thead>
              <tr>
                <td>Hole</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strokes</td>
                {runTable(stroke).map((str) => (
                  <td key={uuidv4()}>{str}</td>
                ))}
                {/* {stroke.map((str) =>
                  str === null ? <td>-</td> : <td key={uuidv4()}>{str}</td>
                )} */}
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          <strong>Total: </strong>
          {stroke.reduce((a, b) => a + b, 0)}
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
