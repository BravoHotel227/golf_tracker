import React, { Fragment, useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import CourseItem from './CourseItem';
import CourseContext from '../../context/course/courseContext';
const Courses = () => {
  const courseContext = useContext(CourseContext);

  const { courses, filtered, getCourses, loading } = courseContext;

  useEffect(() => {
    getCourses();
    //eslint-disable-next-line
  }, []);

  if (courses !== null && courses.length === 0 && !loading) {
    return <h4>Please add a course</h4>;
  }
  return (
    <Fragment>
      {(courses !== null) & !loading ? (
        <TransitionGroup>
          {(filtered || courses).map((course) => (
            <CSSTransition key={course._id} timeout={500} classNames="item">
              <CourseItem course={course} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Courses;
