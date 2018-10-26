import React from 'react';
import ReactDOM from 'react-dom';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  company: 'Kyrkogatans café och hantverk',
  showUserDropdown: state.common.showUserDropdown,
  apps: state.common.apps
})

const mapDispatchToProps = dispatch => ({
  onLogout: () =>
    dispatch({ type: 'LOGOUT' }),
  onToggleUserDropdown: () =>
    dispatch({ type: 'TOGGLE_USER_DROPDOWN' }),
  closeUserDropdown: () =>
      dispatch({type: 'CLOSE_USER_DROPDOWN' })
})

const AppList = props => {
  if(!props.apps) {
    return null;
  }

  return (
      <ul className="navigation__menu hide-for-medium">
        <li><Link to="/profile" className="navigation__menu-item-wrapper"><ion-icon name="person"></ion-icon> Min sida</Link></li>
        <li><Link to="/friends" className="navigation__menu-item-wrapper"><i className="fas fa-user-friends"></i> Vänner</Link></li>
        {props.apps.map((app, key) => (
            <li key={key}>
                <Link to={app.url} className="navigation__menu-item-wrapper">
                    <i className={app.iconCss}></i> {app.appLabel}
                </Link>
            </li>
        ))}
      </ul>
  )
}

class UserDropdown extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  handleClick(event)  {
    // TODO: Fix so that whan a user clicks outside the box it closes...
    if ($('user-dropdown-menu').is(event.target)) {
      if (this.props.showUserDropdown) {
        //this.setState({showDropdown: false})
      }
    }
  }

  render() {
    return (
        <li className="nav-item user-dropdown"
          onMouseOver={this.props.showUserDropdown}>
          <button
            id="user-dropdown-menu"
            className="nav-link"
            role="button">
              {this.props.currentUser.first_name}{"  "}{this.props.showUserDropdown ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
          </button>
          {this.props.showUserDropdown &&
          <div className="user-dropdown-menu" id="user-dropdown" >
            <Link className="dropdown-item"
              to='/settings'
              onClick={this.props.onRedirect}>
              Inställningar
            </Link>
            <div className="dropdown-divider"></div>
            <button
              className="dropdown-item"
              onClick={this.props.onLogout}>
              Logga ut
            </button>
          </div>
          }
        </li>
      )
  }
}
const LoggedInView = props => {
  function onClickLogout() {
    props.onLogout();
    props.onToggleUserDropdown();
    props.history.push('/')
  }

  function onClickToggleUserDropdown(show) {
    props.onToggleUserDropdown();
  }

  function onClickRedirect() {
    props.onToggleUserDropdown();
  }

  function showUserDropdown() {
    props.onToggleUserDropdown()
  }
  if (props.currentUser) {
    //onMouseLeave={props.onToggleUserDropdown}>
    return (
      <div
        onMouseOver={props.onToggleUserDropdown}>
        <ul className="navbar-nav mr-auto">
          {
            props.company &&
            <li className="nav-item d-none d-md-inline">
              <Link to="/" className="nav-link">{props.company}</Link>
            </li>
          }
          <UserDropdown
            onMouseOver={showUserDropdown}
            onToggleUserDropdown={onClickToggleUserDropdown}
            onLogout={onClickLogout}
            onRedirect={onClickRedirect}
            {...props}
          />
        </ul>
      </div>
    )
  }
  else {
    return null;
  }
}

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="login">Logga in</Link>
        </li>
      </ul>
    )
  }
  else {
    return null;
  }
}

const Header = props => {

    return(
      <header >
        <div className="navbar navbar-expand-md navigation__top">
          <div className="container-fluid">
              <Link className="navbar-brand" to='/'>
                {props.appName}
              </Link>

              <div>
                <LoggedOutView currentUser={props.currentUser} />

                <LoggedInView {...props} />
              </div>
            </div>
        </div>

        <nav className="navigation__menu-wrapper">
          <div className="navigation__container">
            <div className="flex-row">
              <div className="navigation__columns">
                <AppList {...props} />
              </div>
            </div>
          </div>
        </nav>
    </header>
    )
}

/*
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navWrapper" aria-controls="navWrapper" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
