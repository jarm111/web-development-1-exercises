import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from './RadioButtonList';
import Answer from './Answer';
import Button from './Button';

/**
 * Handles the view where questions, options and answers are displayed and keeps the current question state
 */
class QuestionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            selectedAnswer: null,
            showAnswer: false,
            isRightAnswer: false,
        };
    }

    handleAnswerOptionsClick = (selection) => {
        this.setState({ selectedAnswer: selection });
    }

    handleAnswerButtonClick = () => {
        if (this.state.selectedAnswer !== null) {
            const isRight =
                (this.state.selectedAnswer === this.props.question.answer);

            isRight && this.props.onRightAnswer();

            this.setState((prevState) => ({
                showAnswer: true,
                isRightAnswer: isRight,
            }));
        }
    }

    handleNextButtonClick = () => {
        this.setState(this.getInitialState());
        this.props.onNextQuestion();
    }

    render() {
        const question = this.props.question;

        return (
            <div className="App-QuestionView">
                <h2 className="App-QuestionNumber">Question #{this.props.questionNumber}</h2>
                <p className="App-QuestionDescription">{question.description}</p>
                <RadioButtonList 
                    options={question.options} 
                    onClick={this.handleAnswerOptionsClick} 
                    selected={this.state.selectedAnswer} 
                />
                <Button
                    onClick={this.handleAnswerButtonClick}
                    isDisabled={this.state.selectedAnswer === null || this.state.showAnswer}
                    value="Answer"
                    className="App-AnswerButton"
                />
                <Button
                    onClick={this.handleNextButtonClick}
                    isDisabled={!this.state.showAnswer}
                    value="Next"
                    className="App-NextButton"
                />
                <Answer 
                    showAnswer={this.state.showAnswer} 
                    isRightAnswer={this.state.isRightAnswer} 
                    answer={question.options[question.answer]} 
                />
            </div>
        );
    }
}

QuestionView.propTypes = {
    question: PropTypes.object.isRequired,
    questionNumber: PropTypes.number.isRequired,
    onRightAnswer: PropTypes.func.isRequired,
    onNextQuestion: PropTypes.func.isRequired,
};

export default QuestionView;
