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

class SuperUserViewComponent extends React.Component {

    render() {

        if (this.props.currentUser.isSuperuser) {
            return (
                <h1>Hi {this.props.currentUser.first_name}</h1>
            )
        }
        else {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperUserViewComponent);