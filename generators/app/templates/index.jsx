import React, { Component } from 'react';
import ReactDOM from 'react-dom';
<% if (reactRouter) { %>import { BrowserRouter as Router, Link, Route} from 'react-router-dom';<% } %>
<% if (redux) { %>import { Provider } from 'react-redux'; <% } %>

<% if (redux) { %>import Store from './store';  <% } %>
<% if (nodeSass) { %>import '../css/app.scss';<% } %>

class App extends Component {
    render() {
        return (
            <% if (redux) { %><Provider store={store}> <% } %>
            <% if (reactRouter) { %>    <Router>
                    <div>
                        <div>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </div>
                        <div>
                            <Route exact={true} path="/" render={() => (<% } %>
            <div>Hello from generator</div>
            <% if (reactRouter) { %>
                            )} />
                        </div>
                    </div>
                </Router><% } %>
            <% if (redux) { %></Provider> <% } %>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
