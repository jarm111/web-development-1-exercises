import React from 'react';
import './App.css';
import questionsData from './questions-data.json';
import PropTypes from 'prop-types';

function RadioButton(props) {
    return (
        <div>
            <input
                    type="radio"
                    value={props.value}
                    onClick={props.onClick}
                    checked={props.checked}
                />
            {props.value}
        </div>
    );
}

RadioButton.defaultProps = {
    value: '',
    checked: false,
};

RadioButton.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
};

function RadioButtonList(props) {
    return (
        <ul>
            {props.options.map((value, index) => 
                    <RadioButton
                        key={index} 
                        value={value}
                        onClick={() => props.onClick(index)}
                        checked={props.selected === index}
                    />
            )}
        </ul>
    );
}

RadioButtonList.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.number,
};

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

function Button(props) {
    return <input
        className={props.className}
        type="button"
        onClick={props.onClick}
        value={props.value}
        disabled={props.isDisabled}
    />;
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
};

Button.defaultProps = {
    value: '',
    isDisabled: false,
};

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: questionsData,
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Quiz Game with React</h1>
                </header>
                <Quiz questions={this.state.questions} />
            </div>
        );
    }
}

export default App;