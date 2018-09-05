import React, { Component } from 'react';
import './App.css';
import Homepage from './View.js'
import NewProject from './Modules/projects/NewProject'
import ProjectView from './Modules/projects/ProjectView'
import CoursesView from './Modules/courses/View'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "animate.css/animate.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/home" exact component={Homepage} />
                  <Route path="/new-project" exact component={NewProject} />
                  <Route path="/projects/:id" component={ProjectView} />
                  <Route path="/courses/:id" exact component={CoursesView} />
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
