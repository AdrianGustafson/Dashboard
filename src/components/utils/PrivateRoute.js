import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
 } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: 'APP_LOADED', })
})

const PrivateRoute = ({ component: Component, ...rest }, props) => (

  <Route {...rest} render={props => {
      return rest.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: props.location}
          }}
        />
      )
    }}
  />
);

export default connect(mapStateToProps, ()=>({}))(PrivateRoute);
