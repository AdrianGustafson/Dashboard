import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  CompanyInfoWidget,
  FacilityWidget,
  UserListPreviewWidget,
  UserCreateWidget,
} from './Widgets';

import agent from '../../agent';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    company: state.company.company,
    companyInfoErrors: state.company.compnayInfoErrors,
    facilityCreateErrors: state.company.facilityCreateErrors,
    profiles: state.profile.profiles,
    profilesCount: state.profile.profilesCount,
    profilesLoadError: state.profile.profilesLoadError,
    profilesPage: state.profile.profilesPage
})

const mapDispatchToProps = dispatch  => ({
  onLoadCompany: payload =>
    dispatch({ type: 'COMPANY_DATA_LOADED', payload }),
  onCreateFacility: payload =>
    dispatch({ type: 'FACILITY_CREATED', payload }),
  onCreateStaff: payload =>
    dispatch({ type: 'COMPANY_STAFF_CREATED', payload }),
  onUnload: () =>
    dispatch({ type: 'COMPANY_PAGE_UNLOADED' }),
  onFetchCompanyEmployees: payload =>
    dispatch({ type: 'COMPANY_EMPLOYEES_LOADED', payload }),
  onSetProfilePage: (payload, page) =>
    dispatch({ type: 'SET_PROFILE_PAGE', payload, page })
})


class Company extends React.Component {
    constructor() {
      super();

      this.state = {
        createStaff: false
      }

      this.onClickCreateFacility = facility => ev => {

        const company = this.props.company;

        this.props.onCreateFacility( agent.Facility.create(company, facility ));
      }
    }

    componentWillMount() {
      if (!this.props.company) {
        const companySlug = this.props.match.params.slug;

        this.props.onFetchCompanyEmployees( agent.Profile.byCompany(companySlug, 0))
        this.props.onLoadCompany( companySlug ? agent.Business.retrieve(companySlug) : null );

      }
    }

    componentWillUnmount() {
      this.props.onUnload();
    }

    onSetPage(page) {
      const companySlug = this.props.match.params.slug;
      const promise = agent.Profile.byCompany(companySlug, page)
      this.props.onSetProfilePage(page, promise)
    }

    onCreateStaff(staffList) {
      const companySlug = this.props.match.params.slug;
      console.log(companySlug);
      console.log(staffList);
      //const promise = agent.Auth.createStaff(companySlug, staffList)
      //this.props.onCreateStaff(promise)
    }

    onToggleCreateStaff() {
      const state = this.state;
      this.setState({createStaff: !state.createStaff });
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

                    {
                      !this.state.createStaff &&
                      <div className="medium-12 large-8">
                        <UserListPreviewWidget
                          title="Anställda"
                          onEditUser="Hello!"
                          onDeleteUser="Hello!"
                          onToggleCreateStaff={this.onToggleCreateStaff.bind(this)}
                          onCreateStaff={this.onCreateStaff}
                          onSetPage={this.onSetPage}
                          currentPage={this.props.profilesPage}
                          usersCount={this.props.profilesCount}
                          users={this.props.profiles} />

                        <FacilityWidget
                          company={company}
                          errors={this.props.facilityCreateErrors}
                          onCreateFacility={this.props.onCreateFacility}
                          facilities={company.facilities} />
                      </div>
                    }

                    {
                      this.state.createStaff &&
                      <div className="medium-12 large-8">
                        <UserCreateWidget
                          onToggleCreateStaff={this.onToggleCreateStaff.bind(this)}
                          facilities={company.facilities}
                          onSubmitForm={this.onCreateStaff.bind(this)}
                        />
                      </div>
                    }



                  <div className="medium-12 large-4">
                    <CompanyInfoWidget company={company} errors={this.props.companyInfoErrors} />

                    <UserListPreviewWidget
                      title="Administratörer"
                      usersCount={company.admins.length}
                      users={company.admins} />
                  </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
