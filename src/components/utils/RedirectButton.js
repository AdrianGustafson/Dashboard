import React from 'react';
import { withRouter } from 'react-router-dom';

const RedirectButton = ({history, to, css, children}) => {
  function onClick(e) {
    e.preventDefault();
    history.push(to)
  }
  return (
    <button
      className={css}
      onClick={onClick}>
        {children}
      </button>
  )
}

export default withRouter(RedirectButton);
