import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import agent from '../../agent';
import { Tab, TabList } from '../utils/Tabs';
import Settings from './Settings';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  tab: state.profile.tab,
  errors: state.profile.errors
});

const mapDispatchToProps = dispatch => ({
  onLoad: ( payload, token ) =>
    dispatch({ type: 'PROFILE_PAGE_LOADED', payload, token }),
  onChangeTab: tab =>
    dispatch({ type: 'CHANGE_TAB', tab }),
  onUnload: () =>
    dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
})

const SalaryView = props => {
  if (props.tab === 'salary') {
    return (
      <div className="medium-12 large-8">

        <div className="widget">
          <div className="widget__header">
            <h2>Min lön</h2>
          </div>
        </div>

      </div>
    )
  }
  else {
    return null;
  }
}
const ProfileView = props => {
  if (props.tab === null) {
    return (
      <div className="flex-row">
        <div className="medium-12 large-8">

          <div className="widget">
            <div className="widget__header">
              <h2>Your Profile</h2>
            </div>
          </div>

        </div>

        <div className="medium-12 large-4">
          <Settings />
        </div>
      </div>
    )
  }
  else {
    return null;
  }
}

class Profile extends React.Component {
  componentWillMount() {
      const token = window.localStorage.getItem('jwt');
      if (token) {
          agent.setToken(token)
      }

      this.props.onLoad( token ? agent.Auth.current() : null, token )
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onChangeTabClick(e, tab) {
    e.preventDefault();
    const { history } = this.props;
    this.props.onChangeTab(tab);
    tab === null ?
        history.push("/profile") :
        history.push(`/profile/${tab}`)
  }

  renderTabs(match, name) {
    return (
      <TabList>
        <Tab
          active={this.props.tab === null}
          onClick={(e) => this.onChangeTabClick(e, null)}>
          <i className="fas fa-id-card" ></i> {name}
        </Tab>
        <Tab
          active={this.props.tab === 'salary'}
          onClick={(e) => this.onChangeTabClick(e, 'salary')}>
          <i className="fas fa-money-bill"></i> Lön
        </Tab>
      </TabList>
    )
  }

  render() {
    const { currentUser, tab, match, location } = this.props;
    return (
      <div className="page-container">
        {this.renderTabs(match, currentUser.first_name)}

        <ProfileView tab={tab} />
        <SalaryView tab={tab} />

      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
