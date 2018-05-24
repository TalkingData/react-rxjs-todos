import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Todos from './components/Todos';

// todomvc styles
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';


const App = () => (
  <div>
    <Router>
      <Route exact path="/" render={() => <Redirect to="/" />} />
    </Router>
    <Router basename="/">
      <div>
        <Route exact path="/" component={Todos} />
        <Route exact path="/:filter" component={Todos} />
      </div>
    </Router>
  </div>
);

export default App;