import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { CompanyPreviewWidget } from './Widgets';

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



class CompanyManageComponent extends React.Component {

    componentDidMount() {
        this.props.onLoad( agent.Business.all() )
    }

    onClickSelectCompany( ev, company ) {
        ev.preventDefault();
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

          return (
              <div className="widget-container">
                <div className="flex-row">
                  <div className="large-12">

                    <CompanyPreviewWidget
                      onClickSelectCompany={this.onClickSelectCompany}
                      companies={this.props.companies} />

                  </div>
                </div>
              </div>
            )
        }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyManageComponent));
