import * as React from 'react';
import * as ReactDOM from 'react-dom';
<% if (reactRouter) { %>import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';<% } %>
<% if (redux) { %>import { Provider } from 'react-redux'; <% } %>

<% if (redux) { %>import Store from './store';  <% } %>
<% if (nodeSass) { %>import '../css/app.scss';<% } %>

class App extends React.Component<{}, {}> {
    render() {
        return (
            <% if (redux) { %><Provider store={Store}> <% } %>
            <% if (reactRouter) { %><Router>
                <div>
                    <div>
                        <Link to={'/'}>
                            Home
                        </Link>
                    </div>
                    <div>
                        <Switch>
                            <Route exact={true} path="/" render={() => (<% } %>
            <div>Hello from generator</div>
            <% if (reactRouter) { %>
                    )} />
                        </Switch>
                    </div>
                </div>
            </Router><% } %>
            <% if (redux) { %></Provider> <% } %>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;