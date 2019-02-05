import React from 'react';
import { connect } from 'react-redux';

import agent from '../../../../agent';

import { ListItem, ListPreview } from '../../../utils/ListPreview';
import {
  Form,
  CheckboxInput,
  TextInput,
  SubmitButton
} from '../../../utils/Forms';

const mapStateToProps = state => ({
  activeRoute: state.sites.activeRoute,
  activeSite: state.sites.activeSite
})

const mapDispatchToProps = dispatch => ({
  onUpdateRoute: (route) =>
    dispatch({ type: 'ROUTE_UPDATED', route }),
  onSaveForm: payload =>
    dispatch({ type: 'ROUTE_UPDATE_SAVED', payload })
})

class PageEditor extends React.Component {
  constructor() {
    super();

    this.onUpdateField = field => ev => {
        ev.preventDefault();
        const route = this.props.activeRoute;

        const nextRoute = Object.assign({}, route, { [field]: ev.target.value})
        this.props.onUpdateRoute(nextRoute)
    }

    this.onSubmitForm = ev => {
      ev.preventDefault();

      const route = this.props.activeRoute;
      const siteId = this.props.activeSite.id;
      delete route.jscomponent;
      this.props.onSaveForm(agent.Site.updateRoute(siteId, route));
    }
  }


  render() {

    const { activeRoute } = this.props;
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>{activeRoute.name}</h2>
        </div>

        <div className="widget__content">
          <Form onSubmit={this.onSubmitForm}>
            <fieldset>
              <TextInput
                value={activeRoute.name}
                onChange={this.onUpdateField("name")}/>

              <CheckboxInput
                name="Publicera sida"
                value={activeRoute.active}
                onChange={this.onUpdateField("active")} />

            </fieldset>

            <SubmitButton>
              Spara ändringar
            </SubmitButton>
          </Form>
        </div>

        <div className="widget__header">
          <h3>Språk</h3>
        </div>

        <div className="widget__content">
          <ListPreview>
            {
              activeRoute.pages.map(page => {
                return (
                  <ListItem key={page.locale}>
                    {page.language}
                  </ListItem>
                )
              })
            }
          </ListPreview>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor)
