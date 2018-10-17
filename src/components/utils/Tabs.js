import React from 'react';
import { Link } from 'react-router-dom';

const TabList = props => {
  return (
    <div className="flex-row">
      <div className="large-12">
        <ul className="tablist">
          {props.children}
        </ul>

      </div>
    </div>
  )
}

const Tab = ({ active, children, onClick}) => {
  //
  const styles = active ? "tablist-item tablist-item--active" : "tablist-item";
  return (
    <li className={styles} onClick={onClick}>
      <a className="tablist-link" >{children}</a>
    </li>
  )
}

export {
  Tab,
  TabList
}
