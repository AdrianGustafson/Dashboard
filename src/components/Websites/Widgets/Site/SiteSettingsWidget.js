import React from 'react';

import { ListPreview, ListItem } from '../../../utils/ListPreview';

const SiteSettingsWidget = ({ site }) => {

  return (
    <div className="widget">
      <div className="widget__header">
        <h2>{site.name}</h2>
      </div>

      <div className="widget__content">
        <ListPreview>
          <ListItem>
            <span className="descriptor">Domän: </span>
            <span>{site.domain}</span>
          </ListItem>

          <ListItem>
            <span className="descriptor">Företag: </span>
            <span>{site.companyName}</span>
          </ListItem>

          <ListItem>
            <span className="descriptor">Anläggning: </span>
            <span>{site.facilityName}</span>
          </ListItem>

          <ListItem>
            <span className="descriptor">Administratör:</span>
            <span></span>
          </ListItem>

          <ListItem>
            <span className="descriptor">Standardspråk:</span>
            <span>{site.default_language.language}</span>
          </ListItem>

        </ListPreview>
      </div>
    </div>
  )
}

export default SiteSettingsWidget
