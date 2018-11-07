import React from 'react';

import {
  ListPreview,
  ListItem,
  ListItemHeader,
  ListItemBody
} from '../../../utils/ListPreview';

const FacilityPreview = props => {
      return (
          <ListItemHeader>
            <div className="descriptor">{props.name}</div>
              <div className="list-actions">

                {
                  false &&
                  <button>
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                }

                {
                  props.count > 1 &&
                  <button
                    onClick={() => (
                      props.onToggleExpand({
                        activeFacility: props.expanded ? null : props.slug}
                      ))}>
                    {props.expanded ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                  </button>
                }

              </div>
          </ListItemHeader>
    )
}

const FacilityView = props => {
  const { facility } = props;
  return (
    <ListItem>
      <FacilityPreview
        expanded={props.expanded}
        slug={facility.slug}
        name={facility.name}
        count={props.count}
        onToggleExpand={props.onToggleExpand}/>

        <ListItemBody expanded={props.expanded}>
          <div className="column__spaced__rows">
            <div className="flex-row">

              <div className="medium-12 large-6">
                <div>
                  <span className="descriptor">
                    <a href={`mailto:${facility.email}`} className="action__link">
                      <i className="far fa-envelope"></i>
                    </a>
                  </span>
                  <span>{facility.email}</span>
                </div>

                <div>
                  <span className="descriptor">
                    <a href={`tel:${facility.phone_number}`} className="action__link">
                      <i className="fas fa-phone"></i>
                    </a>
                  </span>
                  <span>{facility.phone_number}</span>
                </div>
              </div>

              <div className="medium-12 large-6">
                <div>
                  <span className="descriptor">Adress:</span>
                  <span>{facility.adress}</span>
                </div>

                <div>
                  <span className="descriptor">Postnummer:</span>
                  <span>{facility.postal_code}</span>
                </div>

                <div>
                  <span className="descriptor">Ort:</span>
                  <span>{facility.city}</span>
                </div>
              </div>

            </div>

            <div className="flex-row">
              <div className="large-6">
                <p className="time-info">Skapad: {facility.createdAt}</p>{' '}
                <p className="time-info">Uppdaterad: {facility.updatedAt}</p>
              </div>
              <div className="large-6">
                <button className="facility__edit"><i className="far fa-edit"></i></button>
              </div>
            </div>
          </div>
        </ListItemBody>

    </ListItem>
  )
}
const FacilityListPreview = props => {
  if (!props.facilities) {
    return (
      <div className="widget__content">
        <p>Ett fel uppstod, kunde inte ladda dina anläggningar...</p>
      </div>
    )
  }

  if (props.facilities.length === 0) {
    return (
        <div className="widget__content">
          <div className="flex-row centered">

            <div className="large-12">
              <p>Det finns inga anläggningar än... </p>
              <button className="btn btn-primary" onClick={props.onUpdateState({create: true, listPreview: false})}>
                Skapa ny anläggning
              </button>
            </div>

          </div>
        </div>
    )
  }
  else if (props.facilities.length === 1) {

    return (
      <div className="widget__content">
        <div className="flex-row">
          <div className="large-12">
            <FacilityView
              facility={props.facilities[0]}
              expanded="true"
              count="1"
              onToggleExpand={props.onUpdateState}
            />
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
        <div className="widget__content">
          <ListPreview>
            {
                props.facilities.map( (facility, index) => {
                    return (
                    <FacilityView
                        facility={facility}
                        key={facility.slug}
                        count={props.facilities.length}
                        expanded={props.state.activeFacility === facility.slug}
                        onToggleExpand={props.onUpdateState} />
                )})
            }
          </ListPreview>
        </div>
      )
  }
}


export default FacilityListPreview;
