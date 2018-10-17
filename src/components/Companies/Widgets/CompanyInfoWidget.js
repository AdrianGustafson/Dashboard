import React from 'react';
import PropType from 'prop-types';

const CompanyInfoWidget = props => {
  const { company } = props;

  if (props.errors || !company) {
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>Mitt företag</h2>
        </div>
        <div className="widget__content">
          <p>Vi kunde dessvärre inte hämta informationen om ditt företag...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="widget">
      <div className="widget__header">
        <h2>{company.name}</h2>
      </div>
      <div className="widget__content">
        <table className="company-info__table">
          <tbody>
              <tr>
                <th scope="row">Organisationsnumer:</th>
                <td>{company.organisation_number}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
//
CompanyInfoWidget.propTypes = {
  company: PropType.object,
  errors: PropType.array
}

export default CompanyInfoWidget;
