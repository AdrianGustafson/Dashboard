import React from 'react';

import UserListPreview from '../../../utils/UserListPreview';

const UserListPreviewWidget = props => {

  return (
    <div className="widget">
      <div className="widget__header">
        <h2>{props.title}</h2>
        {
          props.onCreateStaff &&
          <button className="action-button success"
            onClick={props.onToggleCreateStaff}>
            <i className="fas fa-user-plus"></i>
          </button>
        }

      </div>
      <div className="widget__content">
        <UserListPreview
          onEditUser={props.onEditUser}
          onDeleteUser={props.onDeleteUser}
          onSetPage={props.onSetPage}
          currentPage={props.currentPage}
          usersCount={props.usersCount}
          users={props.users} />
      </div>
    </div>
  )
}

export default UserListPreviewWidget
