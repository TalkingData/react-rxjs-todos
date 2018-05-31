import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import rxLoop from 'rxloop';
import withRxLoop from '@rxloop/react';

import Todos from './components/Todos';
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
        <Route exact path="/" component={withRxLoop(app, Todos)} />
        <Route exact path="/:filter" component={withRxLoop(app, Todos)} />
      </div>
    </Router>
  </div>
);

export default App;