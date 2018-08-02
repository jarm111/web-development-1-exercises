import React from 'react';
import './App.css';

function AnswerOptions(props) {
    const options = props.options.map((value, index) => {
        return (
            <div key={index}>
                <input 
                    type="radio" 
                    name="option" 
                    value={index}
                    // onClick={() => console.log('click' + index)}
                    onClick={() => props.onClick(index)}
                />{value}
            </div>
        );
    })
    
    return <ul>{options}</ul>
}

function Result(props) {
    return <p>Answer: {props.answer}</p>;
}

function QuestionNumber(props) {
    return <p className="App-qnumber">Question #{props.number}</p>;
}

function QuestionDescription(props) {
    return <p className="Description">{props.description}</p>;
}

function AnswerButton(props) {
    return <input 
                type="button" 
                onClick={() => console.log('Answer click')} 
                defaultValue="Answer" 
            />;
}

function Question(props) {
    const q = props.question;

    const handleClick = index => props.onSelect(index);

    return (
        <div>
            <QuestionNumber number={props.number} />
            <QuestionDescription description={q.description} />
            <AnswerOptions options={q.options} onClick={handleClick} />
            <AnswerButton />
            <Result answer={q.options[q.answer]} />
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.selectAnswer = this.selectAnswer.bind(this);
        this.state = {
            questionNumber: 0,
            questions: questions,
            selectedAnswer: null,
        }
    }

    selectAnswer(selection) {
        this.setState({selectedAnswer: selection});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Quiz Game with React</h1>
                </header>
                <Question 
                    question={this.state.questions[this.state.questionNumber]} 
                    number={this.state.questionNumber + 1}
                    onSelect={this.selectAnswer}
                />
            </div>
        );
    }
}

const questions = [
    {
        description: "Which disease devastated livestock across the UK during 2001?",
        options: [
            "Hand-and-foot",
            "Foot-in-mouth",
            "Hand-to-mouth",
            "Foot-and-mouth"
        ],
        answer: 3
    },
]

export default App;