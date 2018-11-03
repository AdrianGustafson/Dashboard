import React from 'react';
import { connect } from 'react-redux';

import PublicView from './PublicView';
import StaffUserView from './StaffUserView';

import agent from '../../agent';

const mapStateToProps = state => ({
  showSidebar: state.common.showSidebar,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: 'HOME_PAGE_LOADED', payload, token })
})

class Home extends React.Component {

  render() {
    const { currentUser } = this.props;
    if (currentUser){
      return (
            <StaffUserView currentUser={currentUser}/>
      )
    }
    else {
        return <PublicView />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
