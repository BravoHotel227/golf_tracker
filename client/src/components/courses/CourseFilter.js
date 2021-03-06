import React, { useContext, useRef, useEffect } from 'react';
import CourseContext from '../../context/course/courseContext';

const CourseFilter = () => {
  const courseContext = useContext(CourseContext);
  const { filterCourses, clearFilter, filtered } = courseContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const text = useRef('');
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterCourses(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        className="filter"
        ref={text}
        type="text"
        placeholder="Filter Courses..."
        onChange={onChange}
      ></input>
    </form>
  );
};

export default CourseFilter;
