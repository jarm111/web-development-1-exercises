import React from 'react';
import './App.css';
import questionsData from './questions-data.json';
import Quiz from './components/Quiz';

/**
 * Renders the app and passes Quiz the question data
 */
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