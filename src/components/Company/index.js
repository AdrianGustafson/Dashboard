import React from 'react';
import { connect } from 'react-redux';

import { Tab, TabList } from '../utils/Tabs';

import CompanyCreateTab from './CompanyCreateTab';
import CompanyManageTab from './CompanyManageTab';


const mapStateToProps = state => ({
    tab: state.company.tab,
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => 
        dispatch({ 'type': 'COMPANY_PAGE_LOADED', payload }),
    onChangeTab: tab =>
        dispatch({ type: 'COMPANY_CHANGE_TAB', tab })
 })


const MyCompanyTab = props => {
    
    if (props.tab !== null) {
        return null;
    }
    
    return (
        <div>
            <h1>Mitt företag</h1>
        </div>
    )
}


class Company extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const tab = this.props.match.params.tab || "";
        this.props.onLoad(tab)

    }
    
    
    onChangeTabClick(e, tab) {
        e.preventDefault();
        const { history } = this.props;
        this.props.onChangeTab(tab)
        tab === null ?
            history.push("/companies") :
            history.push(`/companies/${tab}`)
      }

    
    renderTabs(tab, history) {
        return (
          <TabList>
            <Tab onClick={(e) => this.onChangeTabClick(e, null)}>
              <i className="fas fa-id-card" ></i> Mitt Företag
            </Tab>
            
            <Tab onClick={(e) => this.onChangeTabClick(e, 'manage')}>
                <i className="fas fa-cog" ></i> Hantera företag
            </Tab>
                
            <Tab onClick={(e) => this.onChangeTabClick(e, 'create')}>
              <i className="fas fa-plus"></i> Skapa företag
            </Tab>
          </TabList>
        )
      }
  
    render() {

        return (
            <div className="page">
                <div className="tab-toggle">
                    {this.renderTabs(this.props.tab)}
                </div>
                
                <MyCompanyTab tab={this.props.tab} />
                <CompanyManageTab tab={this.props.tab} />
                <CompanyCreateTab tab={this.props.tab} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);