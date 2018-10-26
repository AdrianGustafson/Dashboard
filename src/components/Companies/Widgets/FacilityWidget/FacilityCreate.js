import React from 'react';
import { PropTypes } from 'prop-types';

import agent from '../../../../agent';
import {
  AreaInput,
  EmailInput,
  Form,
  PhoneInput,
  NumberInput,
  SubmitButton,
  TextInput
} from '../../../utils/Forms';

class FacilityCreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      adress: '',
      postal_code: null,
      city: '',
      phone_number: '',
      email: '',
      description: ''
    }

    this.onUpdateField = field => ev => {
      const state = this.state;
      const nextState = Object.assign({}, state, { [field]: ev.target.value })
      this.setState(nextState);
    }

    this.onClickSubmit = ev => {
      ev.preventDefault();
      const facility = Object.assign({}, this.state);

      this.props.onSubmit( agent.Facility.create(this.props.company, facility))
    }
  }
  render() {

    var nameErrors, phoneErrors, emailErrors;
    var adressErrors, postalCodeErrors, cityErrors, descriptionErrors;

    if (this.props.errors) {
      const { errors } = this.props;
      console.log(errors);
      nameErrors = errors.name;
      phoneErrors = errors.phone_number;
      emailErrors = errors.emailErrors;
      adressErrors = errors.adress;
      postalCodeErrors = errors.postal_code;
      cityErrors = errors.city;
      descriptionErrors = errors.description;
    }

    return (
      <Form onSubmit={this.onClickSubmit}>
        <TextInput
          errors={nameErrors}
          value={this.state.name}
          placeholder='Anläggningens namn'
          onChange={this.onUpdateField('name')}
        />

        <PhoneInput
          errors={phoneErrors}
          placeholder='Telefonnummer'
          value={this.state.phone_number}
          onChange={this.onUpdateField('phone_number')} />

        <EmailInput
          errors={emailErrors}
          placeholder='Epost'
          value={this.state.email}
          onChange={this.onUpdateField('email')} />

        <fieldset>
          <legend>Adress</legend>
        <TextInput
          errors={adressErrors}
          placeholder='Adress'
          value={this.state.adress}
          onChange={this.onUpdateField('adress')} />

        <NumberInput
          errors={postalCodeErrors}
          placeholder='Postnummer'
          value={this.state.postal_code}
          onChange={this.onUpdateField('postal_code')} />

        <TextInput
          errors={cityErrors}
          placeholder='Ort'
          value={this.state.city}
          onChange={this.onUpdateField('city')} />
        </fieldset>

        <AreaInput
          errors={descriptionErrors}
          placeholder="Kort beskrivning..."
          value={this.state.description}
          onChange={this.onUpdateField('description')}/>
        <div className="flex-row right">
          <SubmitButton>
            Skapa Anläggning
          </SubmitButton>
        </div>
      </Form>
    )
  }

}

const FacilityCreate = props => {
  return (
    <div className="widget__content">
      <FacilityCreateForm
        errors={props.errors}
        company={props.company}
        onSubmit={props.onSubmit}
      />
    </div>
  )
}

FacilityCreate.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FacilityCreate;
