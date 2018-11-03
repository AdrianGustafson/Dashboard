import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import agent from '../../agent';
import { Tab, TabList } from '../utils/Tabs';
import UserSettingsWidget from './Widgets/UserSettingsWidget';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  tab: state.profile.tab,
  profileSaveErrors: state.profile.profileErrors,
  profileSaveSuccess: state.profile.profileSuccess,
  profile: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
  onLoad: ( payload, token ) =>
    dispatch({ type: 'PROFILE_PAGE_LOADED', payload, token }),
  onChangeTab: tab =>
    dispatch({ type: 'CHANGE_TAB', tab }),
  onUnload: () =>
    dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
  onSubmitProfileForm: user =>
    dispatch({ type: 'PROFILE_SETTINGS_SAVED', payload: agent.Auth.saveStaff(user) })
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
          <UserSettingsWidget
            edit={props.editProfile}
            toggleEdit={props.toggleEditProfile}
            currentUser={props.currentUser}
            profile={props.profile}
            errors={props.profileSaveErrors}
            success={props.profileSaveSuccess}
            onSubmitForm={props.onSubmitProfileForm}
          />
        </div>
      </div>
    )
  }
  else {
    return null;
  }
}

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      editProfile: false
    }
  }

  componentWillMount() {
      this.props.onLoad( agent.Profile.current()  )
  }

  componentDidUpdate(nextProps, nextState){

    if (nextProps.profileSaveSuccess) {
      if (nextProps.profileSuccess === true) {
        this.setState({ editProfile: false })
      }
    }
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  toggleEditProfile() {
    const state = this.state;
    this.setState({editProfile: !state.editProfile})
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

        <ProfileView
          tab={tab}
          editProfile={this.state.editProfile}
          toggleEditProfile={this.toggleEditProfile.bind(this)}
          {...this.props}/>

        <SalaryView tab={tab} />

      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
