import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import agent from '../agent';
import { connect } from 'react-redux';

import ListErrors from './ListErrors';

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ 'type': 'UPDATE_FIELD_AUTH', key: 'email', value}),
  onChangePassword: value => {
    console.log(value);
    dispatch({ 'type': 'UPDATE_FIELD_AUTH', key: 'password', value})
  },
  onSubmit: (email, password) => {
    const payload = agent.Auth.register(email, password);
    dispatch({ 'type': 'REGISTER', payload })
  },
  onUnLoad: () =>
    dispatch({ 'type': 'REGISTER_PAGE_UNLOADED' })
})

class Register extends React.Component {
  constructor() {
    super();
    this.onChangeEmail = event => this.props.onChangeEmail(event.target.value);
    this.onChangePassword = event => this.props.onChangePassword(event.target.value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnMount() {
    this.props.onUnLoad();
  }
  render() {
    const { email, password } = this.props;

    return (
      <div className="">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3, col-xs-12">
              <h1 className="text-xs-center">Skapa konto</h1>
              <p className="text-xs-center">
                <Link to="login">
                  Har du redan ett konto?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      email="email"
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
                    className="btn btn-lg btn-primary"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Skapa konto
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
