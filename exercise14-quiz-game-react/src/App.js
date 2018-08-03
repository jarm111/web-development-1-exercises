import React from 'react';
import './App.css';
import questionsData from './questions-data.json';

function AnswerOptions(props) {
    const options = props.options.map((value, index) => {
        return (
            <div key={index}>
                <input
                    type="radio"
                    name="option"
                    value={index}
                    onClick={() => props.onClick(index)}
                    checked={props.selected === index}
                />{value}
            </div>
        );
    })

    return <ul>{options}</ul>
}

function Result(props) {
    if (props.showResult) {
        if (props.isRightAnswer) {
            return <p>Correct Answer!</p>
        }
        return <p>Wrong answer, correct one is: {props.answer}</p>
    }
    return <p>Waiting for answer...</p>
}

function Button(props) {
    return <input
        className={props.className}
        type="button"
        onClick={props.onClick}
        value={props.value}
        disabled={props.isDisabled}
    />;
}

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnswerOptionsClick = this.handleAnswerOptionsClick.bind(this);
        this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handleRestartButtonClick = this.handleRestartButtonClick.bind(this);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            questionNumber: 0,
            selectedAnswer: null,
            showResult: false,
            isRightAnswer: false,
            score: 0,
            isGameOver: false,
        };
        return initialState;
    }

    handleAnswerOptionsClick(selection) {
        this.setState({ selectedAnswer: selection });
    }

    handleAnswerButtonClick() {
        const s = this.state
        let newScore = this.state.score;

        if (s.selectedAnswer !== null) {
            const isRight =
                (s.selectedAnswer === this.props.questions[s.questionNumber].answer)

            if (isRight) newScore += 1;

            this.setState({
                showResult: true,
                isRightAnswer: isRight,
                score: newScore
            });
        }
    }

    handleNextButtonClick() {
        if (this.state.questionNumber === this.props.questions.length - 1) {
            this.setState({ isGameOver: true });
        } else {
        const nextQuestion = this.state.questionNumber + 1;
        this.setState({ 
            questionNumber: nextQuestion,
            selectedAnswer: null,
            showResult: false,
            isRightAnswer: false
        })};
    }

    handleRestartButtonClick() {
        this.setState(this.getInitialState());
    }

    render() {
        const q = this.props.questions[this.state.questionNumber]

        if (this.state.isGameOver) {
            return (
                <div>
                    <h2 className="App-QuestionNumber">Game Over! Your score: {this.state.score}</h2>
                    <Button
                        onClick={this.handleRestartButtonClick} 
                        isDisabled={false} 
                        value="Restart" 
                        className="App-RestartButton" 
                    />
                </div>
            )
        }

        return (
            <div>
                <h2 className="App-QuestionNumber">Question #{this.state.questionNumber + 1}</h2>
                <p className="App-QuestionDescription">{q.description}</p>
                <AnswerOptions options={q.options} onClick={this.handleAnswerOptionsClick} selected={this.state.selectedAnswer} />
                <Button 
                    onClick={this.handleAnswerButtonClick} 
                    isDisabled={this.state.selectedAnswer === null || this.state.showResult} 
                    value="Answer" 
                    className="App-AnswerButton" 
                />
                <Button 
                    onClick={this.handleNextButtonClick} 
                    isDisabled={!this.state.showResult} 
                    value="Next" 
                    className="App-NextButton" 
                />
                <Result showResult={this.state.showResult} isRightAnswer={this.state.isRightAnswer} answer={q.options[q.answer]}/>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: questionsData,
        }
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