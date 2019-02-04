import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent'

import {
  ListPreview,
  ListItem,
  ListItemHeader,
  ListItemBody
 } from '../utils/ListPreview'

import {
  SiteSettingsWidget,
  PageEditor
} from './Widgets';

const SiteActionsWidget = (props) => {

  return (
    <div className="widget">
      <div className="widget__header">
        <h2>Hantera Webbsida</h2>
      </div>

      <div className="widget__content">
        <div>

        </div>
        <ListPreview>
          <ListItem>
            <ListItemHeader>
              <a onClick={props.onSelectPage({name: "settings"})}>
                Sidinställningar
              </a>
            </ListItemHeader>
          </ListItem>

          <ListItem>
            <h3>Dina sidor</h3>
          </ListItem>
          {
            (props.routes || []).map((route, index) => {
              const expanded = props.page ?
                        route.name === props.page.name :
                        false;
              return (
                <ListItem key={index}>
                  <ListItemHeader>
                    <a onClick={props.onSelectPage(route)}>{route.name}</a>
                  </ListItemHeader>

                  <ListItemBody expanded={expanded}>
                    <p>En expanderad version</p>
                  </ListItemBody>
                </ListItem>
              )
            })
          }
        </ListPreview>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  routes: state.sites.routes,
  activeSite: state.sites.activeSite,
  page: state.sites.page,
  pageName: state.sites.pageName
})

const mapDispatchToProps = dispatch => ({
  onLoadPages: payload =>
    dispatch({ type: 'SITE_ROUTES_LOADED', payload }),
  onSelectPage: page =>
    dispatch({ type: 'PAGE_SELECTED', page }),
  onUnload: () =>
    dispatch({ type: 'ACTIVE_SITE_UNLOADED'})
})

class SiteSettings extends React.Component {
  constructor() {
    super();

    this.onSelectPageClick = page => ev => {
      ev.preventDefault();

      this.props.onSelectPage(page);
    }
  }

  componentDidMount() {
    this.props.onLoadPages(agent.Site.routes(this.props.activeSite.id) );
  }

  componentWillUnmount() {
    this.props.onUnload()
  }


  render() {
    if (!this.props.activeSite || this.props.activeSite.slug !== this.props.tab ) {
      return null
    }

    return (
      <div className="flex-row">
        <div className="medium-12 large-8">
          {
            this.props.pageName === 'settings' &&
              <SiteSettingsWidget site={this.props.activeSite} />
          }

          {
            this.props.pageName !== 'settings' &&
              <PageEditor page={this.props.page} />
          }

        </div>

        <div className="medium-12 large-4">
          <SiteActionsWidget
            page={this.props.page}
            onSelectPage={this.onSelectPageClick}
            routes={this.props.routes}
           />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteSettings);
