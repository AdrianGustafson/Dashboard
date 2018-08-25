import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () =>
    dispatch({ type: 'LOGOUT' })
})

const LoggedInView = props => {
  function onLogout() {
    props.onClickLogout();
    props.history.push('/');
  }
  if (props.currentUser) {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/"> <i className="fas fa-user-circle"></i> {props.currentUser.username}</Link>
        </li>

        <li className="nav-item">
          <button
            className="nav-link"
            onClick={onLogout}>
            Logga ut
          </button>
        </li>
      </ul>
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
    <header>
      <nav className="navbar">
        <div className="container">
          <Link className="navbar-brand" to='/'>
            {props.appName}
          </Link>

          <LoggedOutView currentUser={props.currentUser} />

          <LoggedInView {...props} />
        </div>
      </nav>
  </header>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
