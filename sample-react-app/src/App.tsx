import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ExampleComponent from './components/ExampleComponent';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/example" component={ExampleComponent} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;