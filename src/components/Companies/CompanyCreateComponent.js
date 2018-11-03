import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import agent from '../../agent';

import { CompanyCreateWidget } from './Widgets';

/* COMAPANY CREATE COMPONENT*/
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

class CompanyCreateComponent extends React.Component {

    componentWillUnmount() {
      this.props.onUnload();
    }
    render() {

        if (this.props.tab !== 'create') {
            return null;
        }
        if (this.props.success) {
          return <Redirect to={`/business/manage/${this.props.company.slug}`} />
        }

        return (
          <div className="widget-container">
            <div className="flex-row centered">
              <div className="large-12">

                <CompanyCreateWidget
                  errors={this.props.errors}
                  onSubmitForm={this.props.onSubmitForm} />

              </div>
            </div>
          </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateComponent);
