import React from 'react';

import {
  EmailInput,
  Form,
  SelectInput,
  SubmitButton,
  TextInput,
  PhoneInput
} from '../../../utils/Forms';

const UserFormFields = props => {
  const key = props.id;
  return (
    <fieldset>
      <legend>
        <span>Anställd {key + 1}</span>
        <button className="factory__remove-button danger"
        type="button"
        onClick={props.onRemoveUser(key)}>
        <i className="fas fa-times"></i>
        </button>
      </legend>
      <SelectInput
        options={props.facilities}
        name="Anläggning"
       />

      <TextInput
        errors={props.errors.first_name}
        placeholder="Förnamn"
        value={props.first_name}
        onChange={props.onUpdateField(key, 'first_name')}
      />
      <TextInput
        errors={props.errors.last_name}
        placeholder="Efternamn"
        value={props.last_name}
        onChange={props.onUpdateField(key, 'last_name')}
      />
      <EmailInput
        errors={props.errors.email}
        placeholder="Epost"
        value={props.email}
        onChange={props.onUpdateField(key, 'email')}
      />
      <PhoneInput
        errors={props.errors.phone_number}
        placeholder="Telefonnummer"
        value={props.phone_number}
        onChange={props.onUpdateField(key, 'phone_number')}
      />
    </fieldset>
  )
}

class UserCreateFormFactory extends React.Component {
  constructor() {
    super();

    this.state = {
      users: []
    }

    this.onUpdateUserField = (id, field) => ev => {
      ev.preventDefault();

      const state = this.state;
      const nextObject = Object.assign({}, state.users[id], { [field]: ev.target.value })
      state.users[id] = nextObject;

      this.setState(state);

    }

    this.onAddUser = ev => {
      const user = {facility:'', email: '', first_name:'', last_name:'', phone_number:''};

      const users = this.state.users;
      users.push(user)
      this.setState({users: users})
    }

    this.onRemoveUser = id => ev => {
      var from = id
      var to = id
      var users = this.state.users;
      if (id === 0) {
        to = 1
      }
      users.splice(from, to)
      this.setState({users: users})
    }

  }

  componentDidMount() {
    // Add user when component mounts
    this.onAddUser();
  }

  render() {
    var error_array = [];

    if ( this.props.errors) {
      error_array = this.props.errors;
    }
    else {
      for (var i=0; i< this.state.users.length; i++){
        error_array.push({})
      }
    }

    return (
      <Form onSubmit={this.props.onSubmit}>
        <div className="form-factory">
        {
          this.state.users.map( (user, index) => {
            return (
              <UserFormFields
                key={index}
                id={index}
                errors={error_array[index]}
                facilities={this.props.facilities}
                onRemoveUser={this.onRemoveUser}
                onUpdateField={this.onUpdateUserField}
                {...user}
              />
            )
          })
        }

        <button className="action-button factory__add-button"
          type="button"
          onClick={this.onAddUser}>
          Lägg till anställd <i className="fas fa-plus-circle success"></i>
        </button>

        <SubmitButton>
          Bjud in anställda
        </SubmitButton>
        </div>
      </Form>
    )
  }
}

class UserCreateWidget extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>Lägg till anställda</h2>
          <button className="action-button"
            onClick={this.props.onToggleCreateStaff}>
            <i className="fas fa-users"></i>
          </button>
        </div>
        <div className="widget__content">
          <UserCreateFormFactory
            facilities={this.props.facilities}
            errors={this.props.errors}
            onSubmit={this.props.onSubmitForm}
          />
        </div>
      </div>
    )
  }
}

export default UserCreateWidget;
