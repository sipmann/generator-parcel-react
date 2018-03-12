import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (<div>Hello from generator</div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));