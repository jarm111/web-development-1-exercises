import React, { Component } from 'react';
import './App.css';

function Question(props) {
  return (
    <div>
      <p>Which disease devastated livestock across the UK during 2001?</p>
      <form>
        <input type="radio" name="option" value="" />Hand-and-foot<br />
        <input type="radio" name="option" value="" />Foot-in-mouth<br />
        <input type="radio" name="option" value="" />Hand-to-mouth<br />
        <input type="radio" name="option" value="" />Foot-and-mouth<br />
        <input type="button" onclick="" defaultValue="Answer" />
      </form>
      <p>Answer: Foot-and-mouth</p>
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