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

function AnswerButton(props) {
    return <input
        className="App-AnswerButton"
        type="button"
        onClick={props.onClick}
        defaultValue="Answer"
        disabled={props.isDisabled}
    />;
}

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnswerOptionsClick = this.handleAnswerOptionsClick.bind(this);
        this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
        this.state = {
            questionNumber: 0,
            selectedAnswer: null,
            showResult: false,
            isRightAnswer: false,
        }
    }

    handleAnswerOptionsClick(selection) {
        this.setState({ selectedAnswer: selection });
    }

    handleAnswerButtonClick() {
        const s = this.state

        if (s.selectedAnswer !== null) {
            const isRight =
                (s.selectedAnswer === this.props.questions[s.questionNumber].answer)
            this.setState({
                showResult: true,
                isRightAnswer: isRight,
            });
        }
    }

    render() {
        const q = this.props.questions[this.state.questionNumber]

        return (
            <div>
                <p className="App-QuestionNumber">Question #{this.state.questionNumber + 1}</p>
                <p className="App-QuestionDescription">{q.description}</p>
                <AnswerOptions options={q.options} onClick={this.handleAnswerOptionsClick} />
                <AnswerButton onClick={this.handleAnswerButtonClick} isDisabled={this.state.selectedAnswer === null} />
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