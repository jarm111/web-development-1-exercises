import React from 'react';
import './App.css';

function AnswerOptions(props) {
    const options = props.options.map((value, index) => {
        return (
            <div key={index}>
                <input type="radio" name="option" value={value} />{value}
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

function Question(props) {
    return (
        <div>
            <QuestionNumber number={props.number} />
            <QuestionDescription description={props.question.description} />
            <AnswerOptions options={props.question.options}/>
            <input type="button" onClick="" defaultValue="Answer" />
            <Result answer="Foot-and-mouth" />
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNumber: 0,
            questions: questions,
        }
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