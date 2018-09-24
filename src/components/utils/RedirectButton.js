import React from 'react';
import { withRouter } from 'react-router-dom';

const RedirectButton = ({history, to, css, children}) => {
  const onClick = url => ev => {
    ev.preventDefault();
    history.push(url)
  }
  return (
    <button
      className={css}
      onClick={onClick(to)}>
        {children}
      </button>
  )
}

export default withRouter(RedirectButton);
