import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  Form,
  ListErrors,
  PasswordInput,
  SubmitButton
} from '../utils/Forms';

import agent from '../../agent';

const mapStateToProps = state => ({
    errors: state.auth.errors,
    validLink: state.auth.validLink,
    success: state.auth.success,
    type: state.auth.type
})

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, action) =>
        dispatch({ type: 'PASSWORD_RESET_LOADED', payload, action }),
    onSubmitForm: (payload, uidb64, token) =>
        dispatch({ type: 'SUBMIT_PASSWORD_FORM', uidb64, token, payload }),
    onUnLoad: () =>
        dispatch({ type: 'PASSWORD_RESET_UNLOADED' })
})

class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: '',
      password2: ''
    }

    this.onUpdateField = field => ev => {
      ev.preventDefault();
      const state = this.state;
      const nextState = Object.assign(state, { [field]: ev.target.value })
      this.setState(nextState);
    }

    this.onSubmitFormClick = ev => {
      ev.preventDefault();

      const password1 = this.state['password1']
      const password2 = this.state['password2']
      const data = Object.assign({}, { password1, password2 })

      this.props.onSubmit(data)
    }
  }

  render() {

    return(
      <Form onSubmit={this.onSubmitFormClick}>
        <PasswordInput
          placeholder="Ditt nya lösenord"
          value={this.state.password1}
          onChange={this.onUpdateField('password1')} />

        <PasswordInput
            placeholder="Upprepa lösenord"
            value={this.state.password2}
            onChange={this.onUpdateField('password2')} />

        <SubmitButton>
          Uppdatera lösenord!
        </SubmitButton>
      </Form>
    )
  }

}

class PasswordReset extends React.Component {
  constructor() {
    super()
  }
    componentWillMount() {
        const { type, uidb64, token } = this.props.match.params;
        this.props.onLoad( agent.Password.validate(uidb64, token), type );

    }

    componentWillUnMount() {
        this.props.onUnLoad();
    }

    onSubmit(data) {
      const { token, uidb64 } = this.props.match.params;
      this.props.onSubmitForm(agent.Password.submit(data, uidb64, token), uidb64, token);
    }

    render() {
        if (this.props.success) {
          return <Redirect to="/login" />;
        }

        if (this.props.type === 'reset' && this.props.validLink){
            return (
                <div className="page-container">
                  <div className="flex-row centered">
                    <div className="medium-12 large-8">

                      <div className="widget">
                        <div className="widget__header">
                          <h1>Återställ ditt lösenord</h1>
                        </div>
                        <div className="widget__content">
                          <ListErrors errors={this.props.errors} />
                          <PasswordResetForm onSubmit={this.onSubmit.bind(this)} />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            )
        }
        else if (this.props.type === 'create'){
            return (
              <div className="page-container">
                <div className="flex-row centered">
                  <div className="medium-12 large-8">

                    <div className="widget">
                      <div className="widget__header">
                        <h1>Välkommen som ny användare!</h1>
                      </div>
                      <div className="widget__content">
                        <ListErrors errors={this.props.errors} />
                        <PasswordResetForm onSubmit={this.onSubmit.bind(this)} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
        }
        else {
            return (
              <div className="page-container">
                <div className="flex-row centered">
                  <div className="medium-12 large-8">

                    <div className="widget">
                      <div className="widget__content">
                        <p>Formuläret kunde inte laddas, kanske eftersom det redan har använts...</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
