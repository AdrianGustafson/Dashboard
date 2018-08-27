import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Booking from './Booking';
import Header from './Header';
import Friends from './Friends';
import Footer from './Footer';
import Login from './Login';
import NotFound from './NotFound';
import Home from './Home';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './Profile';
import Sidebar from './Sidebar';
import Settings from './Profile/Settings';

import agent from '../agent';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  appLoaded: state.common.appLoaded
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: 'APP_LOADED', payload, token })
})

class App extends React.Component {

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token)
    }

    this.props.onLoad( token ? Promise.all([agent.Auth.current(),
                                        agent.Business.current()
                                       ]) : null, token )
  }

  render() {
    if (!this.props.appLoaded) {
      return (
        <div className="app">
          <main className="main-public">
            <i className="fas fa-spinner fa-spin spinner-lg"></i>
          </main>
        </div>)
    }
    else {
      return (
        <div className="app">
          <Header />
          <Sidebar currentUser={this.props.currentUser} />
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute path="/booking" component={Booking} />
            <PrivateRoute path="/friends" component={Friends} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      )
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
