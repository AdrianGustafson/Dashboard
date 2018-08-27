import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { TOGGLE_SIDEBAR } from '../actions/common';

const mapStateToProps = state => ({
  showSidebar: state.common.showSidebar,
  apps: state.common.company.apps
})

const mapDispatchToProps = dispatch => ({
  onToggleSidebarClick: toggle => {
    dispatch({type: TOGGLE_SIDEBAR, toggle:!toggle})
  }
})


const ToggleSidebarButton = ({ toggle, togglefunc }) => {

  if(toggle === true) {
    return (
      <button
        id="sidebar-toggle__button--active"
        onClick={togglefunc(toggle)}>
        <ion-icon name="ios-arrow-back"></ion-icon>
      </button>
    )
  }
  else {
    return (
      <button
        id="sidebar-toggle__button--hidden"
        onClick={togglefunc(toggle)}>
        <ion-icon name="ios-arrow-forward"></ion-icon>
      </button>
    )
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: props.showSidebar
    }
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      showSidebar: !prevState.showSidebar
    }))
    this.props.onToggleSidebarClick(this.state.showSidebar)
  }

  render() {
    if (this.props.currentUser) {
    return (
      <nav
        className={this.props.showSidebar ? "sidebar sidebar-active" : "sidebar sidebar-hidden"}
        id="sidebar">

          <ul>
            <li><Link to="/profile" className="sidebar-item"><ion-icon name="person"></ion-icon> Min sida</Link></li>
            <li><Link to="/friends" className="sidebar-item"><i className="fas fa-user-friends"></i> Vänner</Link></li>
            <hr />
            {this.props.apps.map(app => (
                <li>
                    <Link to={app.url} className="sidebar-item">
                        <i class={app.iconCss}></i> {app.appLabel}
                    </Link>
                </li>
            ))}
          </ul>
      </nav>
    )
  }
  else {
    return null;
  }
  }
}
/*
<button
  className="d-md-none"
  id={this.props.showSidebar ?
        "sidebar-toggle__button--active" :
        "sidebar-toggle__button--hidden"
      }
  onClick={this.toggleSidebar.bind(this)}>
    {this.state.showSidebar ?
      <ion-icon name="ios-arrow-back"></ion-icon> :
      <ion-icon name="ios-arrow-forward"></ion-icon>
    }
  </button>
*/
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
