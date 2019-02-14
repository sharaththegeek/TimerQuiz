import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch, IndexRoute} from 'react-router-dom';
import App from './App';
import Quiz from './Quiz';
import Start from './Start';
import Result from './Result';
import Leaderboard from './Leaderboard';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter>
    <Switch>
    <Route exact path="/" component={Start}/>
    <Route exact path="/intro" component={App}/>
    <Route exact path="/quiz" component={Quiz}/>
    <Route exact path="/result" component={Result}/>
    <Route exact path="/leader" component={Leaderboard}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
