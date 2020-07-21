import React, { useState, useContext, useEffect } from 'react';
import CourseContext from '../../context/course/courseContext';

const CourseForm = () => {
  const courseContext = useContext(CourseContext);
  const { addCourse } = courseContext;

  useEffect(() => {
    setCourse({
      name: '',
      par: '',
      holePar: [],
      holeMeters: [],
    });
  }, [courseContext]);
  const [course, setCourse] = useState({
    name: '',
    par: '',
    holePar: [],
    holeMeters: [],
  });

  const { name, par, holePar, holeMeters } = course;

  const onChange = (e) =>
    setCourse({ ...course, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addCourse(course);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="text-primary">Add Course</h2>
      <input
        type="text"
        placeholder="Course name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Course Par"
        name="par"
        value={par}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Hole Par (Use spaces to seperate pars)"
        name="holePar"
        value={holePar}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Hole Meters (Use spaces to seperate meters)"
        name="holeMeters"
        value={holeMeters}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={'Add Course'}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default CourseForm;
