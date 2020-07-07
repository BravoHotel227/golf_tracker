import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const CourseItem = ({ course }) => {
  const { name, holePar, holeMeters, par } = course;
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">Course</h3>
      <ul className="list">
        <li>
          <strong>Course Name: </strong>
          {name}
        </li>
        <li>
          <strong>Par </strong>
          {par}
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
                <td>Par</td>
                {holePar.map((crs) => (
                  <td key={uuidv4()}>{crs}</td>
                ))}
              </tr>
              <tr>
                <td>Meters</td>
                {holeMeters.map((mrts) => (
                  <td key={uuidv4()}>{mrts}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      {/* <p>
        <button
          className="btn btn-dark btn-sm"
          //   onClick={() => setCurrent(game)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onClick}>
          Delete
        </button>
      </p> */}
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
