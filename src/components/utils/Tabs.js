import React from 'react';
import { Link } from 'react-router-dom';

const TabList = props => {
  return (
    <ul className="nav nav-tabs">
      {props.children}
    </ul>
  )
}

const Tab = props => {
  return (
    <li className="nav-item" {...props} >
      <a className="nav-link" >{props.children}</a>
    </li>
  )
}

export {
  Tab,
  TabList
}
