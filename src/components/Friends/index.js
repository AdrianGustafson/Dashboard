import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    company: state.common.company,
})

const mapDispatchToProps = state => ({

})

const FriendList = props => {
  if (!props.currentUser.friends) {
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>Vänner</h2>
        </div>
        <div className="widget__content">
          Du har inga vänner än. Här kan du skapa kontakt med några...
        </div>

      </div>
    )
  }
  else {
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>Vänner</h2>
        </div>
        <div className="widget__content">
          <ul>
             {props.currentUser.friends.map(friend => (
                <li>{friend.name}</li>
              ))}
          </ul>
        </div>
      </div>

    )
  }
}
class Friends extends React.Component {

  render() {
    const { currentUser } = this.props
    return (
      <div className="page-container">
        <FriendList currentUser={this.props.currentUser} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
