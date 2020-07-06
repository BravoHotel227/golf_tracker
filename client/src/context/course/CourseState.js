import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import { GET_COURSES, ADD_COURSE, COURSE_ERROR } from '../types';

const CourseState = (props) => {
  const initialState = {
    courses: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Get Courses
  const getCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      dispatch({ type: GET_COURSES, payload: res.data });
    } catch (err) {
      dispatch({ type: COURSE_ERROR, payload: err.response.msg });
    }
  };
  // Add Courses
  const addCourse = async (course) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    course.date = today;
    try {
      const res = await axios.post('/api/courses', course, config);
      dispatch({ type: ADD_COURSE, payload: res.data });
    } catch (err) {
      dispatch({ type: COURSE_ERROR, payload: err.response.msg });
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getCourses,
        addCourse,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseState;
