import React from 'react';
import { PropTypes } from 'prop-types';

import {
  ListPreview,
  ListItem,
  ListItemBody,
  ListItemHeader
} from './ListPreview';

class UserListPreview extends React.Component {

  render() {
    if (this.props.usersCount === 0) {
      return (
        <ListPreview>
          <ListItem>
            <ListItemHeader>
              Det finns inga användare att visa än...
            </ListItemHeader>
          </ListItem>
        </ListPreview>
      )
    }
    return (
        <ListPreview
          onSetPage={this.props.onSetPage}
          count={this.props.usersCount}
          currentPage={this.props.currentPage}
          >
          {
            this.props.users.map((user, index) => {
              return (
                  <ListItem key={index}>
                    <ListItemHeader>
                      <div className="descriptor">{user.first_name} {user.last_name}</div>
                      <div className="list-actions">
                      {
                        this.props.onEditUser &&
                        <button className="action-button warning-text">
                          <i className="fas fa-user-cog"></i>
                        </button>
                      }
                      {
                        this.props.onDeleteUser &&
                        <button className="action-button">
                          <i className="fas fa-user-minus"></i>
                        </button>
                      }
                    </div>
                    </ListItemHeader>
                  </ListItem>
              )
            })
          }
        </ListPreview>
    )
  }
}

UserListPreview.propTypes = {
  users: PropTypes.array.isRequired
}

export default UserListPreview
