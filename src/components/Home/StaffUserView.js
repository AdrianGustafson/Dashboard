import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: 'SUPERUSER_PAGE_LOADED', payload, token })
})

class StaffUserView extends React.Component {

    render() {

        if (this.props.currentUser.isSuperuser) {
            return (
              <div className="page-container">
                <h1>Översikt</h1>
                <div className="flex-row center">
                  <div className="medium-12 large-8">
                    <div className="widget">
                      <div className="widget__header">
                        <h2>Hi {this.props.currentUser.first_name}! This is widget 1. It has a very long and overflowing content.</h2>
                      </div>
                      <div className="widget__content">
                        Content in div.
                      </div>
                    </div>
                    <div className="widget">2</div>
                  </div>

                  <div className="medium-12 large-4">
                    <div className="widget">
                      <div className="widget__header"><h2>3</h2></div>
                      <div className="widget__content">4</div>
                    </div>
                  </div>

                </div>
              </div>
            )
        }
        else {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffUserView);
