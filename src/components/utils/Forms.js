import React from 'react';
import PropTypes from 'prop-types';

class ListErrors extends React.Component {
  render() {
    const { errors } = this.props;
    if (errors) {
      return (
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {key}: {errors[key]}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

const Success = props => {
    if (props.success) {
        return (
            <p className="success">Dina inställningar har sparats!</p>
        ) 
    }
    return null;
}

const EmailInput = props => {
  return (
    <fieldset className="form-group">
      <input
        className="form-control"
        type="email"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </fieldset>
  )
}

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const TextInput = props => {
  return (
    <fieldset className="form-group">
      <input
        className="form-control"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </fieldset>
  )
}
TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const PhoneInput = props => {
  return (
    <fieldset className="form-group">
      <input
        className="form-control"
        type="tel"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </fieldset>
  )
}

PhoneInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

const PasswordInput = props => {
  return (
    <fieldset className="form-group">
      <input
        className="form-control"
        type="password"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </fieldset>
  )
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const NumberInput = props => {
  return (
    <fieldset className="form-group">
      <input
        className="form-control"
        type="number"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </fieldset>
  )
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

const SubmitButton = props => {
  return (
    <button
      className="btn btn-primary"
      type="submit"
      disabled={props.disabled || false}>
        {props.children}
      </button>
  )
}

const Form = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <fieldset>
        {props.children}
      </fieldset>
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export {
  EmailInput,
  Form,
  ListErrors,
  NumberInput,
  PasswordInput,
  PhoneInput,
  SubmitButton,
  Success,
  TextInput
}
