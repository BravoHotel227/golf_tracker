import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import CourseItem from './CourseItem';
import CourseForm from './CourseForm';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';
const Courses = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    //     <Fragment>
    //     {(games !== null) & !loading ? (
    //       <TransitionGroup>
    //         {(filtered || games).map((game) => (
    //           <CSSTransition key={game._id} timeout={500} classNames="item">
    //             <GameItem game={game} />
    //           </CSSTransition>
    //         ))}
    //       </TransitionGroup>
    //     ) : (
    //       <Spinner />
    //     )}
    //   </Fragment>
    <Fragment>
      <h1>Test</h1>
    </Fragment>
  );
};

export default Courses;
