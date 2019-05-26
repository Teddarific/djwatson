import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landing';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div className="all-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
