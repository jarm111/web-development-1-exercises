import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displayes messages based on answer state
 */
function Answer(props) {
    if (props.showAnswer) {
        if (props.isRightAnswer) {
            return <p>Correct Answer!</p>;
        }
        return <p>Wrong answer, correct one is: {props.answer}</p>;
    }
    return <p>Waiting for answer...</p>;
}

Answer.propTypes = {
    showAnswer: PropTypes.bool.isRequired,
    isRightAnswer: PropTypes.bool.isRequired,
    answer: PropTypes.string.isRequired,
};

export default Answer;