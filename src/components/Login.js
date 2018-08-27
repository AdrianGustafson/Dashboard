import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';

import { ListErrors } from './utils/Forms';

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password,
    currentUser: state.common.currentUser,
    errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: 'LOGIN', payload: agent.Auth.login(email, password) }),
  onUnLoad: () =>
    dispatch({ type: 'LOGIN_PAGE_UNLOADED' })
});

class Login extends React.Component {
  constructor() {
    super();
    this.onChangeEmail = event => this.props.onChangeEmail(event.target.value);
    this.onChangePassword = event => this.props.onChangePassword(event.target.value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(email, password);
    };
    this.state = {
      redirectToReferer: false
    }
  }

  componentWillUnMount() {
    this.props.onUnLoad();
  }

  render() {
    const { email, password, currentUser } = this.props;
    const { from } = this.props.location.state || { from: {pathname: "/" }};
    console.log(from);

    if (currentUser) {
      return <Redirect to={from} />;
    }

    return (
      <main className="login">
          <h1 className="text-xs-center">Logga in</h1><br/>

          <ListErrors errors={this.props.errors} />

          <form onSubmit={this.submitForm(email, password)}>
            <fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Epost"
                  value={email}
                  onChange={this.onChangeEmail} />
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Lösenord"
                  value={password}
                  onChange={this.onChangePassword} />
              </fieldset>

              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={this.props.inProgress}>
                Logga in
              </button>

            </fieldset>
          </form>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
