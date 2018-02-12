import React, { Component } from 'react';
import '../css/App.css';
import HomePage from './Dashboard/HomePage.js'
import ProjectsPage from './Projects/ProjectsPage.js'
import NewProjectPage from './Projects/NewProjectPage.js'
import TasksPage from './Todos/TasksPage.js'
import ResourcesPage from './Resources/ResourcesPage.js'
import SettingsPage from './Profile/SettingsPage.js'
import LoginPage from './Auth/Login.js'
import SignUpPage from './Auth/SignUp.js'
import NotFound from './NotFound.js'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Auth from '../tools/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);


class App extends Component {
  render() {
    const currentKey = this.props.location.pathname.split("/")[1] || "/";
    const timeout = { enter: 300, exit: 200 };
    return (
      <TransitionGroup component="main" className="page-main" style={{ height: '100%' }}>
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="fade"
          appear
        >
          <div>
            <Switch location={this.props.location}>
              <Route path="/" exact component={HomePage} />
              <PrivateRoute path="/dashboard" exact component={HomePage} />
              <PrivateRoute path="/projects" exact component={ProjectsPage} />
              <PrivateRoute path="/projects/new" exact component={NewProjectPage} />
              <PrivateRoute path="/projects/:project_id" exact component={ProjectsPage} />
              <PrivateRoute path="/tasks" exact component={TasksPage} />
              <PrivateRoute path="/resources" exact component={ResourcesPage} />
              <PrivateRoute path="/settings" exact component={SettingsPage} />
              <Route path="/signup" exact component={SignUpPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);