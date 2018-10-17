import React from 'react';

const FacilityPreview = props => {
    const { facility } = props;
    if (props.active) {
        return (
            <tr>
                <th scope="row"><button onClick={props.onToggleClick(facility.slug)}><i className="fas fa-times"></i></button></th>
                <th colSpan="5">
                    <div>

                        <p> här är en div!</p>
                    </div>
                </th>
            </tr>
        )
    }
    else {
        return (
            <tr>
                    <th scope="row"><button onClick={props.onToggleClick(facility.slug)}><i className="fas fa-angle-down"></i></button></th>
                    <th scope="row">{facility.name}</th>
                    <td>{facility.phonenumber}</td>
                    <td>{facility.email}</td>
                    <td>{facility.adress}</td>
                    <td>{facility.city}</td>
            </tr>
        )
    }

}
class FacilityListPreviewWidget extends React.Component {
    constructor() {
        super();
        this.state = {
            activeCompany: 'cafe-visthuset'
        }

    this.onToggleClick = slug => ev => {
        const nextSlug = slug === this.state.activeCompany ? '' : slug;
        this.setState({activeCompany: nextSlug})
    }
    }

    render() {
        return (
          <div className="widget">
            <div className="widget__header">
              <h2>Anläggningar</h2>
            </div>

            <div className="widget__content">

            <div className="col-md-3 col-xs-12">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Namn</th>
                            <th scope="col">Telefonnummer</th>
                            <th scope="col">Epost</th>
                            <th scope="col">Adress</th>
                            <th scope="col">Stad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.facilities.map( (facility, index) => {
                                return (
                                <FacilityPreview
                                    facility={facility}
                                    key={facility.slug}
                                    active={this.state.activeCompany === facility.slug}
                                    onToggleClick={this.onToggleClick} />
                            )})
                        }
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        )
    }
}

export default FacilityListPreviewWidget;
