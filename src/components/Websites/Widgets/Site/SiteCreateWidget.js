import React from 'react';

import KeywordList from '../../utils/KeywordList';

import {
  TextInput,
  SubmitButton
} from '../../../utils/Forms';

const LanguageSelectInput = props => {
  return (
    <fieldset className="form-group">
      <label>{props.name}</label>
      <select
        className="form-control"
        onChange={props.onChange}>
        {
          props.options.map( option => {
            return (
              <option
                key={option.locale}
                value={option.locale}>
                {option.language}
              </option>
            )
          } )
        }
      </select>
    </fieldset>
  )
}

const SelectMultiple = props => {
  return (
    <fieldset className="form-group">
      <label>{props.name}</label>
      <select
        multiple
        className="form-control"
        onChange={props.onChange}>
        {
          props.options.map( option => {
            return(
              <option
                key={option.locale}
                value={option.locale}
                label={option.language}>
                {option.language}
              </option>
            )
          })
        }
      </select>
    </fieldset>
  )
}

class SiteCreateForm extends React.Component {
  constructor() {
    super();
    const defaultLanguage = {locale: 'sv', language: 'Svenska'};
    this.state =  {
      name: '',
      domain: '',
      keywords: [],
      default_language: defaultLanguage,
      languages: [defaultLanguage],
      keyword: ''

    }

    this.onUpdateField = field => ev => {
      ev.preventDefault();
      const state = this.state;
      const nextState = Object.assign({}, state, { [field]: ev.target.value});
      this.setState(nextState)
    }

    this.onUpdateDefaultLanguage = ev => {
      ev.preventDefault();
      var options = ev.target
      var value = {}
      for (var i=0, l= options.length; i< l; i++) {
        if (options[i].selected) {
          value.locale = options[i].value,
          value.language= options[i].label
          break
        }
      }
      const state = this.state
      const nextState = Object.assign({}, state, { default_language: value})
      this.setState(nextState)
    }

    this.onUpdateLanguages = ev => {
      var options = ev.target.options;
      var values = []

      for (var i=0, l= options.length; i< l; i++) {
        if (options[i].selected) {
          values.push({locale: options[i].value, language: options[i].label})
        }
      }
      const state = this.state
      const nextState = Object.assign({}, state, {languages: values})
      this.setState(nextState)
    }

    this.onAddKeyword = ev => {
      ev.preventDefault();
      const state = this.state;
      var keywords = state.keywords;
      keywords = keywords.concat(this.state.keyword)

      const nextState = Object.assign({}, state, {
                  keywords: keywords,
                  keyword: ''
                });
      this.setState(nextState)
    }

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        this.onAddKeyword(ev)
      }
    }

    this.onRemoveKeyword = keyword => () => {
      const state = this.state;
      const keywords = state.keywords.filter(
        kw => kw !== keyword
      )
      const nextState = Object.assign({}, state, {keywords: keywords})
      this.setState(nextState)
    }

    this.submitForm = ev => {
      ev.preventDefault();
      var state = this.state;
      delete state.keyword;
      this.props.onSubmit(state);
    }
  }

  render() {
    return (
      <form>
        <fieldset>

          <TextInput
            placeholder="Namn"
            value={this.state.name}
            onChange={this.onUpdateField("name")} />

          <TextInput
            placeholder="Domän: ex. example.com"
            value={this.state.domain}
            onChange={this.onUpdateField('domain')} />

          <LanguageSelectInput
            name="Standardpråk"
            options={this.props.languages}
            onChange={this.onUpdateDefaultLanguage}
           />

           <SelectMultiple
             name="Språk"
             options={this.props.languages}
             onChange={this.onUpdateLanguages}
            />

          <fieldset>
            <TextInput
              placeholder="Lägg till nyckelord"
              value={this.state.keyword}
              onChange={this.onUpdateField("keyword")}
              onKeyUp={this.watchForEnter} />

            <KeywordList
              keywords={this.state.keywords}
              onRemoveKeywordHandler={this.onRemoveKeyword} />

          </fieldset>

          <button
            className="btn btn-primary"
            type="button"
            onClick={this.submitForm}
            >
            Skapa hemsida
          </button>

        </fieldset>
      </form>
    )
  }
}


const SiteCreateWidget = (props) => {
  return (
    <div className="widget">
      <div className="widget__header">
        <h2>Skapa hemsida</h2>
      </div>

      <div className="widget__content">
        <SiteCreateForm
          languages={props.languages}
          onSubmit={props.onSubmit} />
      </div>
    </div>
  )
}
export default SiteCreateWidget;
