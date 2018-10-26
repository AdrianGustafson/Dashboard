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
    Success} from '../../utils/Forms';

import agent from '../../../agent';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: null,
      personal_number: null,
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
    if (this.props.currentUser) {
      Object.assign(this.state, {
        first_name: this.props.currentUser.first_name || '',
        last_name: this.props.currentUser.last_name || '',
        email: this.props.currentUser.email || '',
        phone_number: this.props.currentUser.phone_number || null,
        personal_number: this.props.currentUser.personal_number || null,
        adress: this.props.currentUser.adress || '',
        postal_code: this.props.currentUser.postal_code || null,
        city: this.props.currentUser.city || '',
        bank_account: this.props.currentUser.bank_account || null,
        username: this.props.currentUser.username
      })
    }
  }

  render() {
    const { errors } = this.props;
    var firstNameErrors, lastNameErrors, emailErrors, phoneErrors;
    var personalNumberErrors
    var adressErrors, postalCodeErrors, cityErrors;

    if (errors) {
      firstNameErrors = errors.first_name;
      lastNameErrors = errors.last_name;
      emailErrors = errors.email;
      phoneErrors = errors.phone_number;
      personalNumberErrors = errors.personal_number;
      adressErrors = errors.adress;
      postalCodeErrors = errors.postal_code
      cityErrors = errors.city;
    }

    if (this.props.success) {
      this.props.setSuccess()
    }
    return (
      <div>
        <Success success={this.props.success} message="Dina inställningar har sparats!"/>

        <Form onSubmit={this.onSubmitFormClick}>
              <TextInput
                errors={firstNameErrors}
                placeholder="Förnamn"
                value={this.state.first_name}
                onChange={this.onUpdateField('first_name')}
              />

              <TextInput
                errors={lastNameErrors}
                placeholder="Efternamn"
                value={this.state.last_name}
                onChange={this.onUpdateField('last_name')}
              />

              <EmailInput
                errors={emailErrors}
                placeholder="Epost"
                value={this.state.email}
                onChange={this.onUpdateField('email')}
              />

              <PhoneInput
                errors={phoneErrors}
                placeholder="Telefonnummer"
                value={this.state.phone_number}
                onChange={this.onUpdateField('phone_number')}
              />

              <NumberInput
                errors={personalNumberErrors}
                placeholder="Personnummer"
                value={this.state.personal_number}
                onChange={this.onUpdateField('personal_number')}
              />

              <TextInput
                adress={adressErrors}
                placeholder="Adress"
                value={this.state.adress}
                onChange={this.onUpdateField('adress')}
              />

              <NumberInput
                errors={postalCodeErrors}
                placeholder="Postnummer"
                value={this.state.postal_code}
                onChange={this.onUpdateField('postal_code')}
              />

              <TextInput
                errors={cityErrors}
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
      </div>
    )
  }
}

const SettingsView = props => {
  const { currentUser } = props;

  return (
    <div className="list-preview">
      <div className="list-item">
        <span className="descriptor">Förnamn:</span>
        <span>{currentUser.first_name}</span>
      </div>

      <div className="list-item">
        <span className="descriptor">Efternamn:</span>
        <span>{currentUser.last_name}</span>
      </div>

      <div className="list-item">
        <span className="descriptor">Epost:</span>
        <span>{currentUser.email}</span>
      </div>

      <div className="list-item">
        <span className="descriptor">Telefonnummer:</span>
        <span>{currentUser.phone_number}</span>
      </div>

      {
        currentUser.isStaff &&
        <div className="list-item">
          <span className="descriptor">Personnummer:</span>
          <span>{currentUser.personal_number}</span>
        </div>
      }

      <div className="list-item">
        <span className="descriptor">Adress:</span>
        <span>{currentUser.adress}</span>
      </div>

      <div className="list-item">
        <span className="descriptor">Postnummer:</span>
        <span>{currentUser.postal_code}</span>
      </div>

      <div className="list-item">
        <span className="descriptor">Ort:</span>
        <span>{currentUser.city}</span>
      </div>

    </div>
  )
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
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }
  toggleEdit() {
    const state = this.state;
    this.setState({edit: !state.edit})
  }

  render() {

    return (
      <div className="widget settings-form">
        <div className="widget__header">
            <h2>Personuppgifter</h2>
            <button className="action-button"
              title="Uppdatera personuppgifter"
              onClick={this.toggleEdit.bind(this)}
              style={{color: '#7D7D7C'}}>
              <i className="fa fa-edit"></i>
            </button>
          </div>

          <div className="widget__content">

            {
              this.state.edit &&
              <SettingsForm
                errors={this.props.errors}
                success={this.props.success}
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm}
                setSuccess={this.toggleEdit}
              />
            }

            {
              !this.state.edit &&
              <SettingsView
                currentUser={this.props.currentUser} />
            }

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
