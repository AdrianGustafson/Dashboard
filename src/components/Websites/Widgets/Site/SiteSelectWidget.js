import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
    ListPreview,
    ListItem,
    ListItemHeader,
    ListItemBody
} from '../../../utils/ListPreview';


const mapStateToProps = state => ({
  sites: state.sites.sites,
  activeSite: state.sites.activeSite
})

const mapDispatchToProps = dispatch => ({
  onSelectSite: site =>
    dispatch({ type: 'SITE_SELECTED', site }),
  onSelectTab: tab =>
    dispatch({ type: 'SITES_TAB_CHANGED', tab })
})

const SiteListItem = ({index, site, onSelectSiteClick, activeSite}) => {

  return (
    <ListItem>
      <ListItemHeader>
        <div className="descriptor">
          <Link to="" onClick={(e) => onSelectSiteClick(e, site)}>{site.name}</Link>
        </div>
        <div>
          <span className="descriptor">Domän:</span>
          <span>{site.domain}</span>
        </div>
      </ListItemHeader>

    </ListItem>
  )
}

class SiteSelectWidget extends React.Component {

  onSelectSiteClick(e, site) {
    e.preventDefault();

    this.props.onSelectSite(site);
    this.props.onSelectTab(site.slug);
    this.props.history.push(`/cms/${site.slug}`);

  }

  render() {
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>Dina Webbsidor</h2>
            {
              this.props.canCreateSite &&
              <button className="action-button success"
                onClick={(e) => this.props.onToggleCreateSite(e)}>
                <i className="fas fa-plus"></i>
              </button>
            }
        </div>

        <div className="widget__content">
          <ListPreview >
          {
            this.props.sites.map((site, index) => {
              return (
                <SiteListItem
                  key={index}
                  index={index}
                  site={site}
                  activeSite={this.props.activeSite}
                  onSelectSiteClick={this.onSelectSiteClick.bind(this)} />
              )
            })
          }
        </ListPreview>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteSelectWidget))
