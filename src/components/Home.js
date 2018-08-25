import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RedirectButton from './utils/RedirectButton';

const mapStateToProps = state => ({
  showSidebar: state.common.showSidebar,
  currentUser: state.common.currentUser
})

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showSidebar, history } = this.props;
    if (this.props.currentUser){
      return (
        <main id="main" className="main-private">
          <h1>Hello World!</h1>
          <h4>Second heading</h4>
          <span className="warning"><strong>Warning</strong>!</span>
          <p className="danger">Danger!</p>
          <p className="grey"><strong>Grey</strong></p>

          <section>
            <p>Section 1</p>
          </section>
        </main>
      )
    }
    else {
      return (
        <main className="main-public">
          <h1>Välkommen till bokningssystemet!</h1>
          <p>Du är inte inloggad...</p>
          <RedirectButton
            to="/login"
            css="btn btn-lg btn-primary">
              Klicka här för att logga in!
          </RedirectButton>
        </main>
      )
    }
  }
}

export default withRouter(connect(mapStateToProps, () => ({}))(Home));
