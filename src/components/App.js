import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Login, PasswordReset } from './Authentication';
import Booking from './Booking';
import Company from './Company';
import CompanyContainer from './Company/CompanyContainer';
import {Footer, Header, Sidebar } from './Navs';
import Friends from './Friends';
import NotFound from './NotFound';
import Home from './Home';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './Profile';
import Settings from './Profile/Settings';

import agent from '../agent';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  appLoaded: state.common.appLoaded
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

  shouldComponentUpdate(nextProps) {
    const token = window.localStorage.getItem('jwt');
    if (!nextProps.currentUser && token ) {
        agent.setToken(token);
        this.props.onLoadUser( token ? Promise.all([agent.Auth.current(), agent.Business.apps()]) : null, token)
        return true;
    }
    return true;
  }
   
  render() {
    if (!this.props.appLoaded) {
      return (
        <div className="app">
          <main className="main-public">
            <i className="fas fa-spinner fa-spin spinner-lg"></i>
          </main>
        </div>
      )
    }
    else {
        return (
            <div className="app">
                <Header />
                <Sidebar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path="/booking" component={Booking} />
                    <PrivateRoute path="/companies/manage/:slug" component={CompanyContainer} />
                    <PrivateRoute path="/companies/:tab?" component={Company} />
                    <PrivateRoute path="/friends" component={Friends} />
                    <PrivateRoute path="/profile/:tab?" component={Profile} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/:type(reset|create)/:uidb64/:token" exact component={PasswordReset} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </div>
        )}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
