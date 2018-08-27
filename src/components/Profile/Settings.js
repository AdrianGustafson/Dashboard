import React from 'react';
import { connect } from 'react-redux';

import {
    Form,
    TextInput,
    PhoneInput,
    EmailInput,
    ListErrors,
    NumberInput,
    PasswordInput,
    SubmitButton,
    Success} from '../utils/Forms';

import agent from '../../agent';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: null,
      id_number: null,
      adress: '',
      postal_code: null,
      city: '',
      password: '',
      confirm_password: '',
      username: ''
    };

    this.onUpdateField = field => ev => {
      ev.preventDefault();
      const state = this.state;
      const nextState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(nextState)
    }

    this.onSubmitFormClick = ev => {
      ev.preventDefault();
      const user = Object.assign({}, this.state);

      if (!user.password) {
        delete user.password, user.confirm_password;
      }

      if (!user.password  || !user.confirm_password) {
        delete user.password, user.confirm_password;
      }


      this.props.onSubmitForm(user);
    }
  }

  componentWillMount() {
    console.log(this.props);
    if (this.props.currentUser) {
      Object.assign(this.state, {
        first_name: this.props.currentUser.first_name || '',
        last_name: this.props.currentUser.last_name || '',
        email: this.props.currentUser.email || '',
        phone_number: this.props.currentUser.phone_number || null,
        id_number: this.props.currentUser.id_number || null,
        adress: this.props.currentUser.adress || '',
        postal_code: this.props.currentUser.postal_code || null,
        city: this.props.currentUser.city || '',
        bank_account: this.props.currentUser.bank_account || null,
        username: this.props.currentUser.username
      })
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmitFormClick}>
            <TextInput
              placeholder="Förnamn"
              value={this.state.first_name}
              onChange={this.onUpdateField('first_name')}
            />

            <TextInput
              placeholder="Efternamn"
              value={this.state.last_name}
              onChange={this.onUpdateField('last_name')}
            />

            <EmailInput
              placeholder="Epost"
              value={this.state.email}
              onChange={this.onUpdateField('email')}
            />

            <PhoneInput
              placeholder="Telefonnummer"
              value={this.state.phone_number}
              onChange={this.onUpdateField('phone_number')}
            />

            <NumberInput
              placeholder="Personnummer"
              value={this.state.id_number}
              onChange={this.onUpdateField('id_number')}
            />

            <TextInput
              placeholder="Adress"
              value={this.state.adress}
              onChange={this.onUpdateField('adress')}
            />

            <NumberInput
              placeholder="Postnummer"
              value={this.state.postal_code}
              onChange={this.onUpdateField('postal_code')}
            />

            <TextInput
              placeholder="Ort"
              value={this.state.city}
              onChange={this.onUpdateField('city')}
            />
            <hr />
            <p><strong>Byt lösenord:</strong></p>
            <PasswordInput
              placeholder="Nytt lösenord"
              value={this.state.password}
              onChange={this.onUpdateField('password')}
            />

            <PasswordInput
              placeholder="Upprepa lösenord"
              value={this.state.confirm_password}
              onChange={this.onUpdateField('confirm_password')}
            />
            <hr />
          <SubmitButton>
            Uppdatera inställningar
          </SubmitButton>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  tab: state.profile.tab,
  errors: state.profile.errors,
    success: state.profile.success
})

const mapDispatchToProps = dispatch => ({
  onSubmitForm: user =>
    dispatch({ type: 'PROFILE_SETTINGS_SAVED', payload: agent.Auth.saveStaff(user) })
})

class Settings extends React.Component {

  render() {
    if (!this.props.currentUser || this.props.tab !== 'settings') {
      return null;
    }

    return (
      <div className="settings-form">
        <h1>Personuppgifter</h1>

        <ListErrors errors={this.props.errors} />
        <Success success={this.props.success} />
        
        <SettingsForm
          currentUser={this.props.currentUser}
          onSubmitForm={this.props.onSubmitForm}
          />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
