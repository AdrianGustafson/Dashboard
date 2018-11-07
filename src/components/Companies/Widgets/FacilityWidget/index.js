import React from 'react';

import FacilityListPreview from './FacilityListPreview';
import FacilityCreate from './FacilityCreate';

const WidgetHeader = props => {
  return (
    <div className="widget__header">
      <h2>Anläggningar</h2>
      <div className="action-button-dropdown"
        id="facility-preview__action-button"
        onMouseLeave={props.onHideActionButton}>
        <button className="action-button"
          onMouseDown={props.onShowActionButton}
          onMouseUp={props.onHideActionButton}
          >
          <i className="fas fa-ellipsis-v"></i>
        </button>
        { props.showActionButton &&
          <div className="action-button-menu">
            { !props.state.create &&
              <button
                onClick={() => (props.onSelectAction({create: true, listPreview: false }))}>
                Skapa Anläggning
              </button>
            }
            {
              !props.state.listPreview &&
              <button
                onClick={() => (props.onSelectAction({create: false, listPreview: true }))}>
                  Visa anläggningar
              </button>
            }
          </div>
        }

      </div>
    </div>
  )
}


class FacilityWidget extends React.Component {
  constructor() {
      super();
      this.state = {
          showActionButton: false,
          create: false,
          editFacility: '',
          listPreview: true,
          activeFacility: null
      }

  this.onHideActionButton = ev => {
    this.setState({showActionButton: false})
  }


  }
  onUpdateState(data) {
    const state = this.state
    const nextState = Object.assign({}, state, data);
    this.setState(nextState)
  }

  onSelectView(nextState) {
    this.setState(nextState);
  }

  onShowActionButton(ev) {
    this.setState({showActionButton: true })
  }

  render() {
    return (
      <div className="widget">
        <WidgetHeader
          state={this.state}
          onSelectAction={this.onSelectView.bind(this)}
          showActionButton={this.state.showActionButton}
          onShowActionButton={this.onShowActionButton}
          onHideActionButton={this.onHideActionButton}/>
        {
          this.state.listPreview &&
            <FacilityListPreview
              state={this.state}
              facilities={this.props.facilities}
              onUpdateState={this.onUpdateState.bind(this)}
            />
        }
        {
          this.state.create &&
            <FacilityCreate
              errors={this.props.errors}
              company={this.props.company}
              onSubmit={this.props.onSubmitForm}
            />
        }
      </div>
    )
}
}

export default FacilityWidget;
