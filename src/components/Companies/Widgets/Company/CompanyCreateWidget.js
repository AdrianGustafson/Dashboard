import React from 'react';
import PropTypes  from 'prop-types';
import { Redirect } from 'react-router-dom';

import {
    Form,
    TextInput,
    EmailInput,
    NumberInput,
    PhoneInput,
    ListErrors,
    SubmitButton } from '../../../utils/Forms';


const AdminFields = props => {
  const key = props.id - 1;
  return (
    <fieldset>
      <legend>
        <span>Administratör {props.id}</span>
        <button
          className="factory__remove-button danger"
          type="button"
          onClick={props.onRemoveAdmin(key)}>
          <i className="fas fa-times"></i>
        </button>
      </legend>
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

class AdminFieldsFactory extends React.Component {

  render() {
    var error_array = [];

    if ( this.props.errors) {
      error_array = this.props.errors;
    }
    else {
      for (var i=0; i< this.props.admins.length; i++){
        error_array.push({})
      }
    }
    return (
      <div className="form-factory medium-12 large-6">
        <div className="form-factory__header">
          <h3>Administratörer</h3>
        </div>

        {
          this.props.admins.map((admin, index) => {
            return <AdminFields
              key={index}
              id={index+1}
              errors={error_array[index]}
              onUpdateField={this.props.onUpdateField}
              onRemoveAdmin={this.props.onRemoveAdmin}
              {...admin} />
          })
        }
        <div className="flex-row centered">
          <button className="btn btn-outline-success"
            type="button"
            onClick={this.props.onAddAdmin} >
            Lägg till <i className="fas fa-plus"></i>
          </button>
        </div>

      </div>
    )
  }
}

class CompanyCreateForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          name: '',
          organisation_number: '',
          admins: []
      }

      this.onUpdateField = field => ev => {
          ev.preventDefault();
          const state = this.state;
          const nextState = Object.assign({}, state, { [field]: ev.target.value });
          this.setState(nextState);
      }

      this.onUpdateAdminField = (id, field) => ev => {
        ev.preventDefault();

        const state = this.state;
        const nextObject = Object.assign({}, state.admins[id], { [field]: ev.target.value })
        state.admins[id] = nextObject;

        this.setState(state);

      }

      this.onSubmitFormClick = ev => {
          ev.preventDefault();
          const company = Object.assign({}, this.state);
          this.props.onSubmitForm(company);
      }

      this.onAddAdmin = ev => {
        const admin = {email: '', first_name:'', last_name:'', phone_number:''};

        const admins = this.state.admins;
        admins.push(admin)
        this.setState({admins: admins})
      }
      this.onRemoveAdmin = id => ev => {
        var from = id
        var to = id
        var admins = this.state.admins;
        if (id === 0) {
          to = 1
        }
        admins.splice(from, to)
        this.setState({admins: admins})
      }
  }


  render() {
    const { errors } = this.props;
    var organisation_number_errors = null;
    var name_errors = null;
    var admins_errors = null;

    if ( errors ) {
      name_errors = errors.name;
      organisation_number_errors = errors.organisation_number;
      admins_errors = errors.admins;
    }

    return (
        <Form onSubmit={ this.onSubmitFormClick } >
            <div className="flex-row">
              <div className="medium-12 large-6">
                <fieldset>
                  <div className="form-factory__header">
                    <h3>Företagsuppgifter</h3>
                  </div>
                  <TextInput
                      errors={name_errors}
                      placeholder="Företagsnamn"
                      value={this.state.name}
                      onChange={ this.onUpdateField('name') } />

                  <TextInput
                      errors={organisation_number_errors}
                      placeholder="Organisationsnummer"
                      value={this.state.organisation_number}
                      onChange={this.onUpdateField('organisation_number')} />
                  <hr />
                </fieldset>
              </div>

                <AdminFieldsFactory
                  errors={admins_errors}
                  admins={this.state.admins}
                  onUpdateField={this.onUpdateAdminField}
                  onAddAdmin={this.onAddAdmin}
                  onRemoveAdmin={this.onRemoveAdmin}
                />

            </div>
            <div className="flex-row centered">
              <SubmitButton>
                  Skapa Företag
              </SubmitButton>
            </div>
        </Form>
    )
  }
}



class CompanyCreateWidget extends React.Component {

  render() {

    return (
      <div className="widget">

        <div className="widget__header">
          <h2>Skapa Företag</h2>
        </div>

        <div className="widget__content">
          <CompanyCreateForm
            errors={this.props.errors}
            onSubmitForm={this.props.onSubmitForm} />

        </div>
      </div>
    )
  }
}

CompanyCreateWidget.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default CompanyCreateWidget;
