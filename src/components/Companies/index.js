import React from 'react';
import { connect } from 'react-redux';

import { Tab, TabList } from '../utils/Tabs';

import CompanyCreateComponent from './CompanyCreateComponent';
import CompanyManageComponent from './CompanyManageComponent';
import MyCompanyComponent from './MyCompanyComponent';


const mapStateToProps = state => ({
    tab: state.company.tab,
    currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onLoad: tab =>
        dispatch({ 'type': 'COMPANY_PAGE_LOADED', tab }),
    onChangeTab: tab =>
        dispatch({ type: 'COMPANY_CHANGE_TAB', tab }),
    onUnload: () =>
      dispatch({ type:'COMPANIES_PAGE_UNLOADED' })
 })


class Companies extends React.Component {

    componentDidMount() {
        const tab = this.props.match.params.tab || null;
        this.props.onLoad(tab)

    }

    componentWillUnmount() {
      //this.props.onUnload();
    }

    onChangeTabClick(e, tab) {
        e.preventDefault();
        const { history } = this.props;
        this.props.onChangeTab(tab)
        tab === null ?
            history.push("/business") :
            history.push(`/business/${tab}`)
      }


    renderTabs() {
        return (
          <TabList>
            <Tab
              active={!this.props.tab}
              onClick={(e) => this.onChangeTabClick(e, null)}>
              <i className="fas fa-id-card" ></i> Mitt Företag
            </Tab>

            <Tab
              active={this.props.tab === 'manage'}
              onClick={(e) => this.onChangeTabClick(e, 'manage')}>
                <i className="fas fa-cog" ></i> Hantera företag
            </Tab>

            <Tab
              active={this.props.tab === 'create'}
              onClick={(e) => this.onChangeTabClick(e, 'create')}>
              <i className="fas fa-plus"></i> Skapa företag
            </Tab>
          </TabList>
        )
      }

    render() {

        return (
            <div className="page-container">
              <h1>Företag</h1>

              {this.props.currentUser.isSuperuser ? this.renderTabs() : null }

              <MyCompanyComponent tab={this.props.tab} />
              <CompanyManageComponent tab={this.props.tab} />
              <CompanyCreateComponent tab={this.props.tab} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
