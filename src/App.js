import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Todos from './components/Todos';
import rxLoop from 'rxloop';
import withLoop from './with-rxloop';
import todoModel from './model/todo';

// todomvc styles
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';


const app = rxLoop();
app.model(todoModel);

const App = () => (
  <div>
    <Router>
      <Route exact path="/" render={() => <Redirect to="/" />} />
    </Router>
    <Router basename="/">
      <div>
        <Route exact path="/" component={withLoop(app, Todos)} />
        <Route exact path="/:filter" component={withLoop(app, Todos)} />
      </div>
    </Router>
  </div>
);

export default App;