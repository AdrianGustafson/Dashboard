import React from 'react';
import { connect } from 'react-redux';

import agent from '../../../../agent';

import { ListItem, ListPreview } from '../../../utils/ListPreview';
import {
  Form,
  CheckboxInput,
  TextInput,
  SubmitButton
} from '../../../utils/Forms';
import DasboardSpinner from '../../../utils/DashboardSpinner';

import KeywordList from '../../utils/KeywordList';
import ComponentEditor from './ComponentEditor';

const mapStateToProps = state => ({
  activeRoute: state.sites.activeRoute,
  activeSite: state.sites.activeSite,
  activePage: state.sites.activePage,
  errors: state.sites.errors,
  inProgress: state.sites.inProgress
})

const mapDispatchToProps = dispatch => ({
  onUpdateRoute: (route) =>
    dispatch({ type: 'ROUTE_UPDATED', route }),
  onSaveSettingsForm: payload =>
    dispatch({ type: 'ROUTE_UPDATE_SAVED', payload }),
  onSaveMetaForm: payload =>
    dispatch({ type: 'PAGE_UPDATE_SAVED', payload }),
  onSelectPage: page =>
    dispatch({ type: 'ACTIVE_PAGE_SELECTED', page})

})

const PageSettings = ({ onSubmitFormClick, onUpdateField, activeRoute }) => {
  return (
    <div className="widget__content">
      <Form onSubmit={onSubmitFormClick}>
        <fieldset>
          <TextInput
            value={activeRoute.name}
            onChange={onUpdateField("name")}/>

          <TextInput
            placeholder="js-route, ändras inte..."
            value={activeRoute.jscomponent}
            onChange={onUpdateField("jscomponent")} />

          <CheckboxInput
            name="Publicera sida"
            value={activeRoute.active}
            onChange={onUpdateField("active")} />
        </fieldset>

        <SubmitButton>
          Spara ändringar
        </SubmitButton>
      </Form>
    </div>
  )
}

class PageMetaSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: props.page.author,
      description: props.page.description,
      id: props.page.id,
      keywords: props.page.keywords || [],
      short_name: props.page.short_name,
      title: props.page.title,
      keyword: ""
    }

    this.onSubmitFormClick = ev => {
      ev.preventDefault();

      const state = this.state;
      delete state.keyword
      const siteId = this.props.activeSite.id;

      this.props.onSubmitForm( agent.Site.updatePage(siteId, state ));
    }

    this.onUpdateField = field => ev => {
      ev.preventDefault();
      const state = this.state;
      const nextState = Object.assign({}, state, { [field]: ev.target.value});
      this.setState(nextState);
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
  }

  componentDidUpdate() {
    if (!this.props.inProgress &&
        this.props.page.id !== this.state.id) {
      const { page } = this.props;
      const nextState = Object.assign({}, page)
      this.setState(nextState);
    }
  }

  render() {
    return (
      <div className="widget__content">
        <p>
          Metataggar för språk. Används för sökmotoroptimering. Dessa är unika
          för varje språk. Beskrivning och nyckelord ska därför vara på respektive
          språk för att kunna indexeras av sökmotorer.
        </p>
        <div className="widget__content__header">
          <h3>{this.props.page.language.language}</h3>
        </div>

        <div>
        <form>
          <fieldset>

              <TextInput
                placeholder="Textförfattare"
                value={this.state.author}
                onChange={this.onUpdateField("author")} />

              <TextInput
                placeholder="Beskrivning"
                value={this.state.description}
                onChange={this.onUpdateField("description")} />

              <TextInput
                placeholder="titel"
                value={this.state.title}
                onChange={this.onUpdateField("title")} />

              <fieldset>
                <TextInput
                  placeholder="Lägg till nyckelord"
                  value={this.state.keyword}
                  onChange={this.onUpdateField("keyword")}
                  onKeyUp={this.watchForEnter} />
              </fieldset>

              <KeywordList
                keywords={this.state.keywords}
                onRemoveKeywordHandler={this.onRemoveKeyword} />

          </fieldset>

          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onSubmitFormClick}>
            Spara ändringar
          </button>

        </form>
        </div>
      </div>
    )
  }

}

class PageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onUpdateField = field => ev => {
        ev.preventDefault();
        const route = this.props.activeRoute;

        const nextRoute = Object.assign({}, route, { [field]: ev.target.value})
        this.props.onUpdateRoute(nextRoute)
    }

    this.onSubmitPageSettingsFormClick = ev => {
      ev.preventDefault();

      const route = this.props.activeRoute;
      const siteId = this.props.activeSite.id;
      delete route.jscomponent;
      this.props.onSaveForm(agent.Site.updateRoute(siteId, route));
    }

    this.onSelectPage = page => ev => {
      ev.preventDefault();
      this.props.onSelectPage(page);
    }
  }

  render() {
    const { activeRoute, activePage } = this.props;
    if (this.props.inProgress) {
      return <DasboardSpinner />
    }

    return (
      <div className="widget">
        <div className="widget__header">
          <h2>{activeRoute.name}</h2>
        </div>
        {
          (!this.props.activePage && !this.props.inProgress ) &&
            <PageSettings
              activeRoute={activeRoute}
              onUpdateField={this.onUpdateField}
              onSubmitFormClick={this.onSubmitPageSettingsFormClick}
            />
        }

        {
          this.props.activePage &&
            <PageMetaSettings
              page={activePage}
              activeSite={this.props.activeSite}
              onSubmitForm={this.props.onSaveMetaForm}
              errors={this.props.errors}
              inProgress={this.props.inProgress}
            />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor)
