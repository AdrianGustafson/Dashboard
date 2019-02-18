import React from 'react';

const ComponentEditor = (props) => {
  if (!props.page) {
    return null
  }
  
  return (
    <div className="widget">
      <div className="widget__header">
        <h2>{props}</h2>
      </div>

      <div className="widget__content">

      </div>
    </div>
  )
}

export default ComponentEditor;
