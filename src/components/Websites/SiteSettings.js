import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent'

import {
  ListPreview,
  ListItem,
  ListItemHeader,
  ListItemBody,
 } from '../utils/ListPreview'

import {
  SiteSettingsWidget,
  PageEditor
} from './Widgets';

const NestedPageListItemBody = props => {
  if (!props.expanded) {
    return null;
  }

  return (
    <div className="list-item__nested__expanded">
      {props.children}
    </div>
  )
}

const NestedPageListItem = ({ page, onSelectPage, active }) => {
  return (
    <div className={active ? "list-item__nested active" : "list-item__nested"}>
      <a onClick={onSelectPage(page)}>{page.language}</a>
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
              <a onClick={props.onSelectRoute(null)}>
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

                  <NestedPageListItemBody expanded={expanded}>
                    {
                      route.pages.map(page => {
                        return (
                          <NestedPageListItem
                            key={page.id}
                            page={page}
                            onSelectPage={props.onSelectPage}
                            active={ props.activePage ?
                                          props.activePage.id === page.id :
                                          false
                                    }
                           />
                        )
                      })
                    }
                  </NestedPageListItemBody>
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
  activePage: state.sites.activePage
})

const mapDispatchToProps = dispatch => ({
  onLoadRoutes: payload =>
    dispatch({ type: 'SITE_ROUTES_LOADED', payload }),
  onSelectRoute: route =>
    dispatch({ type: 'ROUTE_SELECTED', route }),
  onSelectPage: payload =>
    dispatch({ type: 'ACTIVE_PAGE_SELECTED', payload }),
  onUnload: () =>
    dispatch({ type: 'ACTIVE_SITE_UNLOADED'})
})

class SiteSettings extends React.Component {
  constructor() {
    super();

    this.onSelectRouteClick = route => ev => {
      ev.preventDefault();

      this.props.onSelectRoute(route);
      this.props.onSelectPage(null);
    }

    this.onSelectPageClick = page => ev => {

      const siteId = this.props.activeSite.id;
      const promise = page ? agent.Site.getPage( siteId, page.id) : null;
      this.props.onSelectPage( promise )
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
            (this.props.activeRoute) &&
              <PageEditor />
          }

        </div>

        <div className="medium-12 large-4">
          <SiteActionsWidget
            activeRoute={this.props.activeRoute}
            activePage={this.props.activePage}
            onSelectRoute={this.onSelectRouteClick}
            onSelectPage={this.onSelectPageClick}
            routes={this.props.routes}
           />
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteSettings);
