import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  CompanyInfoWidget,
  FacilityListPreviewWidget
} from './Widgets';

import agent from '../../agent';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    company: state.company.company,
    errors: state.company.errors,
})

const mapDispatchToProps = dispatch  => ({
  onLoadCompany: payload =>
    dispatch({ type: 'COMPANY_DATA_LOADED', payload }),
  onUnload: () =>
    dispatch({ type: 'COMPANY_PAGE_UNLOADED' })
})


class Company extends React.Component {

    componentDidMount() {
      if (!this.props.company) {
        const companySlug = this.props.match.params.slug;

        this.props.onLoadCompany( companySlug ? agent.Business.retrieve(companySlug) : null );
      }
    }

    componentWillUnmount() {
      this.props.onUnload();
    }

    render() {
        const { company, errors } = this.props;

        if (errors) {
          return (
            <div className="flex-row centered">
              <div className="medium-12 large-8">

                <div className="widget">
                  <div className="widget__header">
                    <h2>Företaget kunde inte hittas...</h2>
                  </div>

                  <div className="widget__content">
                    <p>Vi kunde inte hämta företaget du begärde av någon anledning. Det kan vara så att företaget inte finns eller så har du inte behörighet att se information om företaget.</p>
                  </div>
                </div>

              </div>
            </div>
          )
        }

        if (!company) {
          return (
            <div className="page-container">
              <div className="flex-row">
                <div className="medium-12 large-8">

                  <div className="widget">
                    <div className="widget__header">
                      <h2>Laddar företag...</h2>
                    </div>

                    <div className="widget__content">
                      <div className="flex-row centered">
                        <i className="fas fa-spinner fa-spin spinner-lg center-content"></i>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        }

        return (
            <div className="page-container">
                <div className="flex-row">
                  <div className="medium-12 large-8">

                    <FacilityListPreviewWidget facilities={company.facilities} />

                  </div>

                  <div className="medium-12 large-4">
                    <CompanyInfoWidget company={company} errors={this.props.errors} />
                  </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
