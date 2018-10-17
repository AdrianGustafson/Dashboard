import React from 'react';
import { connect } from 'react-redux';

import PublicComponent from './PublicComponent';
import StaffViewComponent from './StaffViewComponent';
import SuperUserViewComponent from './SuperUserViewComponent';

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
  constructor(props) {
    super(props);
  }


  render() {
    const { currentUser } = this.props;
    if (currentUser){
      return (
            <SuperUserViewComponent currentUser={currentUser}/>
      )
    }
    else {
        return <PublicComponent />
    }
  }
}
// <StaffViewComponent currentUser={currentUser} />
export default connect(mapStateToProps, mapDispatchToProps)(Home);
