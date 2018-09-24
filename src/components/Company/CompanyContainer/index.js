import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    company: state.company.company,
})

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
class FacilityListPreview extends React.Component {
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
        )
    }
}

class CompanyContainer extends React.Component {
 
    render() {
        const { company } = this.props;
        
        if (!company) {
            return <Redirect to="/companies/manage" />
        }
            
        return (
            <div className="page ">
                <div className="company-container">
                    <h1>{company.name}</h1>
            
                    <p>Här är företagsviewen. Här kan du se till exemepel dina anläggningar, dina anställda. Dina appar.</p>
            
                    <FacilityListPreview facilities={company.facilities} />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, ()=>({}))(CompanyContainer);