import React, { Component } from 'react';
import './App.css';
import Homepage from './View.js'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "animate.css/animate.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Switch>
                  <Route path="/" exact component={Homepage} />
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
