import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import agent from '../../agent';

import {
    Form, 
    TextInput, 
    NumberInput, 
    ListErrors, 
    SubmitButton } from '../utils/Forms';


class CompanyCreateForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            organisation_number: ''
        }
        
        this.onUpdateField = field => ev => {
            ev.preventDefault();
            const state = this.state;
            const nextState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(nextState);
        }
        
        this.onSubmitFormClick = ev => {
            ev.preventDefault();
            const company = Object.assign({}, this.state);
            
            this.props.onSubmitForm(company)
        }
    }
    
    render() {
        console.log(this)
        return (
            <Form onSubmit={ this.onSubmitFormClick } >

                <TextInput 
                    placeholder="Företagsnamn"
                    value={this.state.name}
                    onChange={ this.onUpdateField('name') } />
                <NumberInput
                    placeholder="Organisationsnummer"
                    value={this.state.organisation_number}
                    onChange={this.onUpdateField('organisation_number')} />
                <hr />
                <SubmitButton>
                    Skapa Företag
                </SubmitButton>
            </Form>
        )
    }
}


const mapStateToProps = state => ({
    errors: state.company.errors,
    success: state.company.success,
    tab: state.company.tab,
    company: state.company.company
})

const mapDispatchToProps = dispatch => ({
    onSubmitForm: company => 
        dispatch({ type: 'SUBMIT_CREATE_COMPANY', payload: agent.Business.create(company) }),
    onUnload: () =>
        dispatch({ type: 'COMPANY_CREATE_UNLOADED' })
})

class CompanyCreateTab extends React.Component {
    
    render() {
        
        if (this.props.tab !== 'create') {
            return null;
        }
        
        return (
            <div className="form company-create-form">
                <h1>Skapa Företag</h1>
                <ListErrors errors={this.props.errors} />
                <CompanyCreateForm 
                    onSubmitForm={this.props.onSubmitForm} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateTab);