import React from 'react';
import PropTypes from 'prop-types';

const CourseItem = () => {
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">Course</h3>
      <ul className="list">
        <li>
          <strong>Course Name: </strong>
          Canterbury
        </li>
        <li>
          <strong>Par </strong>
          66
        </li>
        <li>
          <strong>Hole Par: </strong>
        </li>
        <li>
          <strong>Hole Meters </strong>
        </li>
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          //   onClick={() => setCurrent(game)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </p>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
