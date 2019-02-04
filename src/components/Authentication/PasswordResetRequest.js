import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ListErrors } from '../utils/Forms';
import agent from '../../agent';

const mapStateToProps = state => ({
  inProgress: state.common.inProgress,
  errors: state.auth.errors,
  success: state.auth.success
})

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: 'PASSWORD_RESET_REQUESTED', payload }),
  onUnload: () =>
    dispatch({ type: 'PASSWORD_RESET_PAGE_UNLOADED'} )
})

class PasswordResetRequest extends React.Component {
  constructor() {
    super();

    this.state = {
      email: ''
    }
    this.onChangeEmail = event => {
      const new_email = event.target.value;

      this.setState({'email': new_email });

    }

    this.submitForm = event => {
      event.preventDefault();
      const email = this.state.email;

      this.props.onSubmit( agent.Password.request(email) );
    };
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    if (this.props.success) {
      return <Redirect to='/login' />
    }

    return (
      <div className="page-container login">
        <div className="flex-row centered">
          <div className="medium-12 large-8">
            <div className="widget">
              <h1 className="text-center">Logga in</h1><br/>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm}>
                <fieldset>
                  <p>Skriv in din epost. Vi kommer att skicka ett mejl till dig
                  med uppgifter om hur du återställer ditt lösenord.</p>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Epost"
                      value={this.state.email}
                      onChange={this.onChangeEmail} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Logga in
                  </button>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetRequest);
