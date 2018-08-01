import React, { Component } from 'react';
import './App.css';

function AnswerOption(props) {
    return (
        <div>
            <input type="radio" name="option" value={props.value} />{props.value}<br />
        </div>
    );
}

function Result(props) {
    return (
        <p>Answer: {props.answer}</p>
    )
}

function Question(props) {
    return (
        <div>
            <p>Which disease devastated livestock across the UK during 2001?</p>
            <form>
                <AnswerOption value="Hand-and-foot" />
                <AnswerOption value="Foot-in-mouth" />
                <AnswerOption value="Hand-to-mouth" />
                <AnswerOption value="Foot-and-mouth" />
                <input type="button" onClick="" defaultValue="Answer" />
            </form>
            <Result answer="Foot-and-mouth" />
        </div>
    );
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Quiz Game with React</h1>
                </header>
                <p className="App-intro">
                    Question #1
                </p>
                <Question />
            </div>
        );
    }
}

export default App;