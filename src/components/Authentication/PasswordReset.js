import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

const mapStateToProps = state => ({
    validLink: state.auth.validLink
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: 'PASSWORD_RESET_LOADED', payload }),
    onSubmitForm: payload =>
        dispatch({ type: 'SUBMIT_PASSWORD_FORM', payload }),
    onUnLoad: () =>
        dispatch({ type: 'PASSWORD_RESET_UNLOADED' })
})

class PasswordReset extends React.Component {

    componentWillMount() {
        const { type, uidb64, token } = this.props.match.params;
        
        this.props.onLoad( agent.Password.validate(uidb64, token) );
    }
    
    componentWillUnMount() {
        this.props.onUnLoad();
    }
    
    render() {
        const { type, uidb64, token } = this.props.match.params;

        if (type === 'reset'){
            return (
                <main className="main-public">
                    <h1>Återställ ditt lösenord</h1>
                    <form>

                    </form>
                </main>
            )
        }
        else if (type === 'create'){
            return (
                <main className="main-public">
                <h1>Välkommen som ny användare!</h1>
                </main>
            )
        }
        else {
            return null;
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);