import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    company: state.common.company,
})

const mapDispatchToProps = state => ({
    
})

class Friends extends React.Component {
    
    render() {
        const { currentUser } = this.props
        
        if (!currentUser.friends) {
            return (
                <div className="page">
                    Du har inga vänner än...
                </div>
            )
            
        }
        else {
            return (
            <div className="page">
                <ul>
               {currentUser.friends.map(friend => (
                <li>{friend.name}</li>
                ))}
                </ul>
            </div> 
        )
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);