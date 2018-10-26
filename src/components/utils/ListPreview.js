import React from 'react';

const ListPreview = props => {
  return (
    <div className="list-preview">
      {props.children}
    </div>
  )
}

const ListItem = props => {
  return (
    <div className="list-item">
      {props.children}
    </div>
  )
}

const ListItemHeader = props => {
  return (
    <div className="list-item__preview">
      {props.children}
    </div>
  )
}

const ListItemBody = props => {
  if (!props.expanded) {
    return null;
  }
  
  return (
    <div className="list-item__expanded">
      {props.children}
    </div>
  )
}

export {
  ListPreview,
  ListItem,
  ListItemHeader,
  ListItemBody
}
