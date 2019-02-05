import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { SiteCreateWidget } from './Widgets';
import agent from '../../agent';

const mapStateToProps = state => ({
  tab: state.sites.tab,
  languages: state.sites.languages,
  activeSite: state.sites.activeSite,
  errors: state.sites.errors,
  success: state.sites.success,
})

const mapDispatchToProps = dispatch => ({
  onLoadLanguages: payload =>
    dispatch({ type: 'LANGUAGES_LOADED', payload}),
  onUnload: () =>
    dispatch({ type: 'SITE_CREATE_UNLOADED' }),
  onSubmit: payload =>
    dispatch({ type: 'SITE_CREATED', payload })
})

class SiteCreate extends React.Component {

  componentDidMount() {
    if (!this.props.languages) {
      this.props.onLoadLanguages( agent.Site.languages() )
    }
  }

  onSubmitClick(data) {
    const companySlug = 'kyrkogatans-cafe-och-hantverk-hb'; // temporary
    this.props.onSubmit( agent.Site.create(companySlug, data))
  }

  render() {
    if (this.props.tab !== 'create') {
      return null
    }
    if (this.props.success) {
        return <Redirect to='/cms'/>
    }

    return (
      <div className="flex-row">
        <div className="large-12">

          <SiteCreateWidget
            languages={this.props.languages}
            onSubmit={this.onSubmitClick.bind(this)} />

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteCreate);
