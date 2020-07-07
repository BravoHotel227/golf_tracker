import React, { useContext, useEffect } from 'react';
import Courses from '../courses/Courses';
import AuthContext from '../../context/auth/authContext';
import CourseForm from '../courses/CourseForm';
import CourseFilter from '../courses/CourseFilter';

const Course = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <CourseForm />
      </div>
      <div>
        <CourseFilter />
        <Courses />
      </div>
    </div>
  );
};

export default Course;
