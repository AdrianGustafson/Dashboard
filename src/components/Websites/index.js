import React from 'react';
import { connect } from 'react-redux';

import { Tab, TabList } from '../utils/Tabs';

import Website from './Website';
import SiteCreate from './SiteCreate'
import SiteSettings from './SiteSettings';

import agent from '../../agent';


const mapStateToProps = state => ({
  //currentCompany: state.common.currentCompany
  currentUser: state.common.currentUser,
  activeSite: state.sites.activeSite,
  sites: state.sites.sites,
  tab: state.sites.tab
})

const mapDispatchToProps = dispatch => ({
  onLoadCompanySites: payload =>
    dispatch({ type: 'SITES_PAGE_LOADED', payload }),
  onChangeTab: tab =>
    dispatch({ type: 'SITES_TAB_CHANGED', tab}),
  onUnload: () =>
    dispatch({ type: 'SITES_PAGE_UNLOADED' })
})

class Websites extends React.Component {

  componentWillMount() {
    const companySlug = 'kyrkogatans-cafe-och-hantverk-hb'

    this.props.onLoadCompanySites( companySlug ?
      agent.Site.all(companySlug) : null
    )
  }

  onToggleCreateSite(e) {
    e.preventDefault();
    const { history } = this.props;
    this.props.onChangeTab('create')
    history.push('/cms/create')
  }

  onChangeTabClick(e, tab) {
    e.preventDefault();
    const { history } = this.props;
    this.props.onChangeTab(tab)
    tab === null ?
      history.push('/cms') :
      history.push(`/cms/${tab}`)
  }

  renderTabs() {
    return (
      <TabList>
        <Tab
          active={!this.props.tab}
          onClick={(e) => this.onChangeTabClick(e, null)}>
            Hemsidor
        </Tab>

        <Tab
          active={this.props.tab === 'images'}
          onClick={(e) => this.onChangeTabClick(e, 'images')}>
          Bildbank
        </Tab>

        <Tab
          active={this.props.tab === 'analytics'}
          onClick={(e) => this.onChangeTabClick(e, 'analytics')}>
          Statistik
        </Tab>

        {
          this.props.tab === 'create' &&
          <Tab
            active={this.props.tab === 'create'}>
            Skapa hemsida
          </Tab>
        }
        {
          this.props.activeSite &&
          <Tab
            active={this.props.tab === this.props.activeSite.slug}
            onClick={(e) => this.onChangeTabClick(e, this.props.activeSite.slug)}>
            {this.props.activeSite.name}
          </Tab>
        }
      </TabList>
    )
  }

  render() {
    return (
      <div className="page-container">
        <h1>Hemsidor</h1>

        {this.renderTabs()}

        <Website
          tab={this.props.tab}
          activeSite={this.props.activeSite}
          sites={this.props.sites}
          onToggleCreateSite={this.onToggleCreateSite.bind(this)}
          canCreateSite={this.props.currentUser.isSuperuser}
        />

        <SiteCreate />

        {
          this.props.activeSite &&
            <SiteSettings
              tab={this.props.tab}
              activeSite={this.props.activeSite} />
        }

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Websites);
