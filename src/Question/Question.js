import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
  return (<div>
    <h3 className="question">{props.content}
      </h3>
      <div class='row'>
      <div class='column'>

            {
              props.difficulty==='Hard' && <button className="btn btn-danger">HARD</button>
            }
            {
            props.difficulty==='Easy' && <button  className="btn btn-success">EASY</button>
            }



      </div>



      <div class='column'><b>category :</b> {props.category}</div>
      </div>
      </div>
     );
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
