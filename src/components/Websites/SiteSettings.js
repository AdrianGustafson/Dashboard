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


const NestedPageListItem = ({ page }) => {
  return (
    <div className="list-item__nested">
      <a>{page.language}</a>
    </div>
  )
}

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
              <a onClick={props.onSelectRoute({name: "settings"})}>
                Sidinställningar
              </a>
            </ListItemHeader>
          </ListItem>

          <ListItem>
            <h3>Dina sidor</h3>
          </ListItem>
          {
            (props.routes || []).map((route, index) => {
              const expanded = props.activeRoute ?
                        route.name === props.activeRoute.name :
                        false;
              return (
                <ListItem key={index}>
                  <ListItemHeader>
                    <a onClick={props.onSelectRoute(route)}>{route.name}</a>
                  </ListItemHeader>

                  <ListItemBody expanded={expanded}>
                    {
                      route.pages.map(page => {
                        return (
                          <NestedPageListItem key={page.id} page={page} />
                        )
                      })
                    }
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
  activeRoute: state.sites.activeRoute,
})

const mapDispatchToProps = dispatch => ({
  onLoadRoutes: payload =>
    dispatch({ type: 'SITE_ROUTES_LOADED', payload }),
  onSelectRoute: route =>
    dispatch({ type: 'ROUTE_SELECTED', route }),
  onUnload: () =>
    dispatch({ type: 'ACTIVE_SITE_UNLOADED'})
})

class SiteSettings extends React.Component {
  constructor() {
    super();

    this.onSelectRouteClick = route => ev => {
      ev.preventDefault();

      this.props.onSelectRoute(route);
    }
  }

  componentDidMount() {
    this.props.onLoadRoutes(agent.Site.routes(this.props.activeSite.id) );
  }

  componentDidUpdate() {
    if (this.props.tab !== this.props.activeSite.slug) {
      this.props.onUnload()
    }
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
            !this.props.activeRoute &&
              <SiteSettingsWidget site={this.props.activeSite} />
          }

          {
            this.props.activeRoute &&
              <PageEditor />
          }

        </div>

        <div className="medium-12 large-4">
          <SiteActionsWidget
            activeRoute={this.props.activeRoute}
            onSelectRoute={this.onSelectRouteClick}
            routes={this.props.routes}
           />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteSettings);
