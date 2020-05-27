import React from "react";
import "./styles.css";
import Main from "./Main";
import Spoil from "./Spoil";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/spoil/:id" component={Spoil} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
