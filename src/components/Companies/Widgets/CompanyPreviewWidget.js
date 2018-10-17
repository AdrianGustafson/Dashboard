import React from 'react';
import { Link } from 'react-router-dom';


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
        <div className="flex-row right">
            <div className="small-6 ">
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
                props.companies.map( (company, index) => {
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
    )
  }

}


class CompanyPreviewWidget extends React.Component {

  render() {
    return (

      <div className="widget">
        <div className="widget__header">
          <h2>Hantera företag</h2>
          <button className="action-button"><i className="fas fa-ellipsis-v"></i></button>
        </div>

        <CompanyListPreview {...this.props} />
      </div>
    )
  }
}

export default CompanyPreviewWidget;
