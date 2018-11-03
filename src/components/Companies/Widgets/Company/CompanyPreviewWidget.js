import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import {
  ListPreview,
  ListItem,
  ListItemHeader,
  ListItemBody
} from '../../../utils/ListPreview';


const CompanyListPreview = props => {
  if (!props.companies) {
    return (
      <div className="widget__content">
        <p>Läser in företag...</p>

      </div>
    )
  }
  else if (props.companies.length === 0) {
    return (
        <div className="widget__content">
            <p>Inga företag att hantera än....</p>
            <button onClick={() => this.onClickAddCompany()} className="btn btn-primary">
                <i className="fas fa-plus"></i> Lägg till företag
            </button>
        </div>
    )
  }
  else {
    return (
      <div className="widget__content">
        <ListPreview>
            {
                props.companies.map( (company, index) => {
                  var expanded = props.state.activeCompany === company.slug;
                    return (
                        <ListItem key={company.slug}>
                          <ListItemHeader>
                            <div className="descriptor">
                              <Link to={`/business/manage/${company.slug}`} onClick={ e => (this.onSelectCompanyClick(e, company)) }>{company.name}</Link>
                            </div>
                            <div className="list-actions">
                              <button
                                onClick={() => (
                                  props.onToggleExpand({
                                    activeCompany: expanded ? null : company.slug
                                  })
                                )}>
                                  {expanded ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                                </button>
                                <button>
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                              </div>
                          </ListItemHeader>


                          <ListItemBody expanded={expanded}>
                            <div ValidationError="column__spaced__rows">
                              <div className="flex-row">
                                <div className="medium-12 large-6">
                                  <div>
                                    <span className="descriptor">
                                      Organisationsnummer:
                                    </span>
                                    <span>
                                      {company.organisation_number}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="descriptor">
                                      <a href={`mailto:${company.email}`} className="action__link">
                                        <i className="far fa-envelope"></i>
                                      </a>
                                    </span>
                                    <span>{company.email}</span>
                                  </div>

                                  <div>
                                    <span className="descriptor">
                                      <a href={`tel:${company.phone_number}`} className="action__link">
                                        <i className="fas fa-phone"></i>
                                      </a>
                                    </span>
                                    <span>{company.phone_number}</span>
                                  </div>

                                </div>

                                <div className="medium-12 large-6">
                                  <span className="descriptor">
                                    En lista på facilities eller liknande...
                                  </span>
                                </div>

                              </div>

                              <div className="flex-row">

                              </div>
                            </div>
                          </ListItemBody>

                        </ListItem>
                    )
                })
            }
        </ListPreview>
      </div>
    )
  }

}

class CompanyPreviewWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      activeCompany: null,

    }
  }

  onUpdateState(data) {
    const state = this.state;
    const nextState = Object.assign({}, state, data)
    this.setState(nextState)
  }

  render() {
    return (

      <div className="widget">
        <div className="widget__header">
          <h2>Hantera företag</h2>
          <button className="action-button"><i className="fas fa-ellipsis-v"></i></button>
        </div>

        <CompanyListPreview
          state={this.state}
          onToggleExpand={this.onUpdateState.bind(this)}
          {...this.props} />

      </div>
    )
  }
}

CompanyPreviewWidget.propTypes = {
  companies: PropTypes.array.isRequired,
  currentUser: PropTypes.object
}

CompanyPreviewWidget.defaultProps = {
  currentUser: null
}

export default CompanyPreviewWidget;
