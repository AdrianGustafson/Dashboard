import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import agent from '../../agent';

import { TOGGLE_SIDEBAR } from '../../actions/common';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  showSidebar: state.common.showSidebar,
  apps: state.common.apps
})

const mapDispatchToProps = dispatch => ({
    onToggleSidebarClick: toggle => {
        dispatch({type: TOGGLE_SIDEBAR, toggle:!toggle})
    },
    onLoad: payload => 
        dispatch({ type: 'SIDEBAR_LOADED', payload })
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
    const { apps } = this.props;

    if (!this.props.currentUser) {
        return null;
    }
      
    return (
      <nav
        className={this.props.showSidebar ? "sidebar sidebar-active" : "sidebar sidebar-hidden"}
        id="sidebar">

          <ul>
            <li><Link to="/profile" className="sidebar-item"><ion-icon name="person"></ion-icon> Min sida</Link></li>
            <li><Link to="/friends" className="sidebar-item"><i className="fas fa-user-friends"></i> Vänner</Link></li>
            <hr />
            {apps.map((app, key) => (
                <li key={key}>
                    <Link to={app.url} className="sidebar-item">
                        <i className={app.iconCss}></i> {app.appLabel}
                    </Link>
                </li>
            ))}
          </ul>
      </nav>
    )
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
