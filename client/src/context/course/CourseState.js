import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
  GET_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  COURSE_ERROR,
  CLEAR_FILTER,
  FILTER_COURSES,
  GET_COURSE,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types';

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
  // Get Course by ID
  const getCourse = async (id) => {
    try {
      const res = await axios.get(`/api/courses/${id}`);
      dispatch({ type: GET_COURSE, payload: res.data });
      return res.data;
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
    if (!Array.isArray(course.holePar)) {
      var hpr = course.holePar.split(' ');
      course.holePar = hpr.map((hp) => parseInt(hp));
    }
    if (!Array.isArray(course.holeMeters)) {
      var hmt = course.holeMeters.split(' ');
      course.holeMeters = hmt.map((hm) => parseInt(hm));
    }
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

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`);
      dispatch({ type: DELETE_COURSE, payload: id });
    } catch (err) {
      dispatch({ type: COURSE_ERROR, payload: err.response.msg });
    }
  };

  const filterCourses = (text) => {
    dispatch({ type: FILTER_COURSES, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  const setCurrent = (course) => {
    dispatch({ type: SET_CURRENT, payload: course });
  };

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getCourses,
        getCourse,
        addCourse,
        deleteCourse,
        filterCourses,
        clearFilter,
        clearCurrent,
        setCurrent,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseState;
