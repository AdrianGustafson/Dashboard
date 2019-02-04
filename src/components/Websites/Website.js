import React from 'react';

import {
  SiteSelectWidget,
  SiteSettingsWidget
} from './Widgets';

class Website extends React.Component {

  render() {
    if (this.props.tab !== null) {
      return null;
    }

    return (
      <div className="flex-row">

        <div className="medium-12 large-12">
          {
            this.props.sites &&
              <SiteSelectWidget
                sites={this.props.sites}
                onToggleCreateSite={this.props.onToggleCreateSite}
                canCreateSite={this.props.canCreateSite}
              />
          }
        </div>

      </div>
    )
  }
}

export default Website
