import React from "react";
import NavBar from "./navBar";
import UserForm from "./userForm";
import history from "../history";
import { Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import TodoDashboard from "./todoDashboard";

const App = props => {
  return (
    <div className="container">
      <Router history={history}>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" exact component={UserForm} />
            <Route path="/user/:userId" component={TodoDashboard} />
            <Route path="*" component={UserForm} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
