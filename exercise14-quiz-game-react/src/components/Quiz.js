import React from 'react';
import PropTypes from 'prop-types';
import ResultView from './ResultView';
import QuestionView from './QuestionView';

/**
 * Runs the Quiz game and keeps the overall game state
 */
class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            questionNumber: 0,
            score: 0,
            isGameOver: false,
        };
    }

    increaseScore = () => {
        this.setState((prevState) => ({
            score: prevState.score + 1
        }));
    }

    handleNextQuestion = () => {
        if (this.state.questionNumber === this.props.questions.length - 1) {
            this.setState({ isGameOver: true });
        } else {
            this.setState((prevState) => ({
                questionNumber: prevState.questionNumber + 1,
            }));
        }
    }

    handleRestartButtonClick = () => {
        this.setState(this.getInitialState());
    }

    render() {
        const resultView = (
            <ResultView 
                score={this.state.score}
                onRestart={this.handleRestartButtonClick}
            />
        );

        const questionView = (
            <QuestionView 
                question={this.props.questions[this.state.questionNumber]}
                questionNumber={this.state.questionNumber + 1}
                onRightAnswer={this.increaseScore}
                onNextQuestion={this.handleNextQuestion}
            />
        );

        return this.state.isGameOver ? resultView : questionView;
    }
}

Quiz.propTypes = {
    questions: PropTypes.array.isRequired,
};

export default Quiz;