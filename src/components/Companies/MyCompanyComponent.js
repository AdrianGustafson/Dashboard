import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

import { CompanyInfoWidget } from './Widgets';

const mapStateToProps = state => ({
  currentCompany: state.company.currentCompany,
  errors: state.company.errors
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'CURRENT_COMPANY_LOADED', payload }),
  onUnload: () =>
    dispatch({ type: 'CURRENT_COMPANY_UNLOADED' })
})

class MyCompanyComponent extends React.Component {
  componentDidMount() {
    if (!this.props.currentCompany) {
      this.props.onLoad( agent.Business.current() )
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render(){
    if (this.props.tab !== null) {
        return null;
    }

    return (
      <div className="flex-row">
        <div className="medium-12 large-8">

          <div className="widget">
            <div className="widget__header">
              <h2>Någon typ av information</h2>
            </div>

            <div className="widget__content">
              <p>Här finns någon typ av saker som kan göras med företaget. Till exempel att sköta anställda eller anläggningar</p>
            </div>
          </div>
        </div>

        <div className="medium-12 large-4">

          <CompanyInfoWidget company={this.props.currentCompany} errors={this.props.errors}/>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCompanyComponent);
