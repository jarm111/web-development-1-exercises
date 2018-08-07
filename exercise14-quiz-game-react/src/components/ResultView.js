import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function ResultView(props) {
    return (
        <div>
            <h2 className="App-GameOver">Game Over!</h2>
            <h3>Your score: {props.score}</h3>
            <Button
                onClick={props.onRestart}
                isDisabled={false}
                value="Restart"
                className="App-RestartButton"
            />
        </div>
    );
}

ResultView.propTypes = {
    score: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired,
};

export default ResultView;