import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';


function Result(props) {
  var suc=props.correct/(props.correct+props.wrong)*100;
  return (<div>

    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
    <h2 class ="report">
      REPORT CARD
    </h2>
      <div>

      <p>Most of Your answers are <strong>{props.quizResult}</strong>!   </p>
      <p>No of Correct Answers:{props.correct}
      </p>
      <p>No of Wrong Answers:{props.wrong}</p>
      <p>Success Percent is {suc}%</p>
      <p>You got wrong answers from the given fields</p>
        <ul>
          <li>Quadratic:{props.nq}</li>
          <li>Circles:{props.nc}</li>
          <li>Probability:{props.np}</li>
          <li>Arithematic Progression:{props.na}</li>
          <li>Real Numbers:{props.nr}</li>
          </ul>



      </div>
    </CSSTransitionGroup>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
