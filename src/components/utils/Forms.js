import React from 'react';
import PropTypes from 'prop-types';

class ListErrors extends React.Component {
  render() {
    const { errors } = this.props;
    if (errors) {
      return (
        <ul className="list-errors">
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {errors[key]}
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
            <p className="success">{props.message}</p>
        )
    }
    return null;
}

const AreaInput = props => {
  return (
    <fieldset className="form-group">
      <ListErrors errors={props.errors} />
      <textarea
        className="form-control"
        rows={props.rows || "8"}
        cols={props.cols || "50"}
        type="textarea"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </fieldset>
  )
}

AreaInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const EmailInput = props => {
  return (
    <fieldset className="form-group">
      <ListErrors errors={props.errors} />
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
      <ListErrors errors={props.errors} />
      <input
        className="form-control"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
       />
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
      <ListErrors errors={props.errors} />
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
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  onChange: PropTypes.func.isRequired
}

const PasswordInput = props => {
  return (
    <fieldset className="form-group">
      <ListErrors errors={props.errors} />
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
      <ListErrors errors={props.errors} />
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

const SelectInput = props => {
  return (
    <fieldset className="form-group">
      <label>{props.name}</label>
      <select className="form-control" name={props.name}>
        {
          props.options.map( (option, index) => {
            return (
              <option key={index} value={option.slug}>{option.name}</option>
            )
          } )
        }
      </select>
    </fieldset>
  )
}

SelectInput.propTypes = {
  options: PropTypes.array.isRequired
}

const CheckboxInput = props => {
  return (
    <fieldset className="form-group">

      <input
        type="checkbox"
        value={props.value}
        onChange={props.onChange} />
      <span>{" "}{props.name}</span>

    </fieldset>
  )
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
  AreaInput,
  CheckboxInput,
  EmailInput,
  Form,
  ListErrors,
  NumberInput,
  PasswordInput,
  PhoneInput,
  SelectInput,
  SubmitButton,
  Success,
  TextInput
}
