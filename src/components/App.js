import React from 'react';

import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Login, PasswordReset } from './Authentication';
import Booking from './Booking';
import Companies from './Companies';
import Company from './Companies/Company';
import {Footer, Header } from './Navs';
import Friends from './Friends';
import NotFound from './NotFound';
import Home from './Home';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './Profile';

import agent from '../agent';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  appLoaded: state.common.appLoaded,
  showUserDropdown: state.common.showUserDropdown
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: 'APP_LOADED', payload, token }),
  onLoadUser: (payload, token) =>
    dispatch({type: 'USER_DATA_LOADED', payload, token })
})

class App extends React.Component {


  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token)
    }

    this.props.onLoad( token ? Promise.all([agent.Auth.current(),
                                        agent.Business.apps()
                                       ]) : null, token )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const token = window.localStorage.getItem('jwt');
    if (this.props.currentUser === null && token ) {
        agent.setToken(token);
        this.props.onLoadUser( token ? Promise.all([agent.Auth.current(), agent.Business.apps()]) : null, token)
    }
  }

  render() {
    if (!this.props.appLoaded) {
      return (
        <div className="app">
          <main className="app">
            <div className="page-container">
              <div className="flex-row centered">

                <div className="medium-12">
                  <i className="fas fa-spinner fa-spin spinner-lg"></i>
                </div>

              </div>
            </div>
          </main>
        </div>
      )
    }
    else {
        return (
            <div>
                <Header />
                <main className="app">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path="/booking" component={Booking} />
                    <PrivateRoute path="/business/manage/:slug" component={Company} />
                    <PrivateRoute path="/business/:tab?" component={Companies} />
                    <PrivateRoute path="/friends" component={Friends} />
                    <PrivateRoute path="/profile/:tab?" component={Profile} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/:type(reset|create)/:uidb64/:token" exact component={PasswordReset} />
                    <Route component={NotFound} />
                </Switch>
                </main>
                <Footer />
            </div>
        )}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
