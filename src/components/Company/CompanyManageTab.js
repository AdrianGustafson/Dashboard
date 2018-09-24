import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import agent from '../../agent';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    companies: state.company.companies,
    company: state.company.company
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ 'type': 'COMPANY_MANAGE_TAB_LOADED', payload }),
    onSelectCompany: company =>
        dispatch({ 'type': 'COMPANY_SELECTED', company }),
    onChangeTab: tab => 
        dispatch({ type: 'COMPANY_CHANGE_TAB', tab })
})

const CompanyListPreview = props => {
    
}

class CompanyManageTab extends React.Component {

    componentDidMount() {
        this.props.onLoad( agent.Business.all() )
    }
    onSelectCompanyClick( ev, company ) {
        ev.preventDefault();

        this.props.onSelectCompany(company)
        this.props.history.push(`/companies/manage/${company.slug}`);
    }
    
    onClickAddCompany() {
        this.props.onChangeTab('create');
        this.props.history.push("/companies/create");
    }
    
    render() {

        if (this.props.tab !== 'manage') {
            return null;
        }
        
        if (!this.props.companies) {
            return (
                <div className="company-preview">
                    <h1>Hantera företag</h1>
                    Läser in företag... 
                </div>
            )
        }
        
        if (this.props.companies.length === 0) {
            return (
                <div className="company-preview">
                    <h1>Hantera företag</h1>
                        
                    <p>Inga företag att hantera än....</p>
                    <button onClick={() => this.onClickAddCompany()} className="btn btn-primary">
                        <i className="fas fa-plus"></i> Lägg till företag
                    </button>
                </div>
            )
        }
        else {
            return (
                <div className="container company-preview"> 
                    <h1>Hantera företag</h1>
                    <div className="col-md-6 col-xs-12">
                        <div className="row">
                            <div className="col-xs-4 order-2">
                        <button className="btn btn-primary company-add-btn" onClick={() => this.onClickAddCompany()}>
                            <i className="fas fa-plus"></i> Lägg till företag
                        </button>
                            </div>
                        </div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Organisationsnummer</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.companies.map( (company, index) => {
                                    return (
                                        <tr key={company.slug}>
                                            <th scope="row">{index}</th>
                                            <td><Link to={`/companies/manage/${company.slug}`} onClick={ e => (this.onSelectCompanyClick(e, company)) }>{company.name}</Link></td>
                                            <td>{company.organisation_number}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyManageTab));