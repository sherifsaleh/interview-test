import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory } from 'react-router'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={App}>
    </Route>
    <Route path="/:id" component={App}/>
  </Router>
  ,
  document.getElementById('root')
);
