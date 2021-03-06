import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landing';
import DJ from './dj';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div className="all-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dj" component={DJ} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
