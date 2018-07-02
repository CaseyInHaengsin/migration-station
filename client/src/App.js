import React, { Component } from 'react';
import './App.css';
import Homepage from './View.js'
import QuoteV2 from './quoteV2/view'
import Contact from './contact/view'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "animate.css/animate.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/quote" exact component={QuoteV2} />
                  <Route path="/contact" exact component={Contact} />
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
