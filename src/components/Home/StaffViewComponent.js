import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: 'STAFF_PAGE_LOADED', payload })
})

class StaffViewComponent extends React.Component {
    /*
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }
        
        this.props.onLoad( token ? Promise.all([
                agent.Auth.current(),
                agent.Business.current(),
                agent.Business.apps()]) : null, token )
    }
    */
    render() {
        
        if (!this.props.currentUser.isSuperuser) {
            return (
                <div>
                    <h1>Hello World!</h1>
                    <h4>Second heading</h4>
                    <span className="warning"><strong>Warning</strong>!</span>
                    <p className="danger">Danger!</p>
                    <p className="grey"><strong>Grey</strong></p>
                
                    <section>
                        <p>Section 1</p>
                    </section>
                </div>
            )
        } 
        else {
            return null;
        }
    }
}

export default connect(() =>({}), mapDispatchToProps)(StaffViewComponent);