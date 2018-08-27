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
    dispatch({ type: 'CHANGE_TAB', tab })
})

const SalaryView = props => {
  if (props.tab === 'salary') {
    return (
      <div>
        <h1>Min lön</h1>
      </div>
    )
  }
  else {
    return null;
  }
}
const ProfileView = props => {
  if (props.tab === 'profile') {
    return (
      <div>
        <h1>Your Profile</h1>
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
    
  onChangeTabClick(e, tab) {
    e.preventDefault();
    this.props.onChangeTab(tab)
  }

  renderTabs(match, username) {
    return (
      <TabList>
        <Tab onClick={(e) => this.onChangeTabClick(e, 'profile')}>
          <i className="fas fa-id-card" ></i> {username}
        </Tab>
        <Tab onClick={(e) => this.onChangeTabClick(e, 'salary')}>
          <i className="fas fa-money-bill"></i> Lön
        </Tab>
        <Tab onClick={(e) => this.onChangeTabClick(e, 'settings')}><i className="fas fa-cog" ></i> Inställningar</Tab>
      </TabList>
    )
  }

  render() {
    const { currentUser, tab, match, location } = this.props;
    return (
      <div className="page">
        <div className="tab-toggle">
          {this.renderTabs(match, currentUser.username)}
        </div>

        <ProfileView tab={tab} />
        <SalaryView tab={tab} />
        <Settings />
      </div>
    )
  }
}

/*
<Tab onClick={(e) => this.onChangeTabClick(e, 'settings')}>
   Inställningar
</Tab>
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
