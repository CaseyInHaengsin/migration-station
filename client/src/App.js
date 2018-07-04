import React, { Component } from 'react';
import './App.css';
import Homepage from './View.js'
import QuoteV2 from './quoteV2/view'
import Contact from './contact/view'
import Storage from './quoteV2/Storage'
import Delivery from './quoteV2/Delivery'
import Size from './quoteV2/Size'
import Final from './quoteV2/Final'

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
                  <Route path="/storage" exact component={Storage} />
                  <Route path="/delivery" exact component={Delivery} />
                  <Route path="/size" exact component={Size} />
                  <Route path="/final" exact component={Final} />
                  <Route path="/contact" exact component={Contact} />
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
