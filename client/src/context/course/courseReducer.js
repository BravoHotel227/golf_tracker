import {
  GET_COURSES,
  GET_COURSE,
  ADD_COURSE,
  COURSE_ERROR,
  FILTER_COURSES,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
        loading: false,
      };
    case FILTER_COURSES:
      return {
        ...state,
        filtered: state.courses.filter((course) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return course.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
