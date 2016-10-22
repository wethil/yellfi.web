import React, { Component } from 'react';
import UserOwnYells from './UserYells/UserOwnYells.jsx'
import UserNotificationComposer from './UserYells/UserNotificationComposer.jsx'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import emitter from '../../emitter.js'
import LoadingCircle from './YellsComponents/LoadingCircle.jsx'


const recentsIcon = <FontIcon className="material-icons">person</FontIcon>;
const locationIcon = <FontIcon className="material-icons">notifications</FontIcon>;

 class UserYells extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = { botNavIndex: 0};
 	}
 
  
 	


	render() {
		ipLoc=this.props.ipLoc
		content = this.state.botNavIndex==0 ?  <UserOwnYells height={'73.6vh'} /> : <UserNotificationComposer height={'73.6vh'} ipLoc={ipLoc} />

	
		return (
			 <div className="className">	
			 {content}	  


	 <div id="bottomNav" >
	 	<Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.botNavIndex}>
          <BottomNavigationItem
            label="Plans"
            icon={recentsIcon}
           onTouchTap={() => this.setState({botNavIndex: 0})}
          />
          <BottomNavigationItem
            label="Notifications"
            icon={locationIcon}
            onTouchTap={() => this.setState({botNavIndex: 1})}
          />
 
        </BottomNavigation>
      </Paper>
	 </div>
			    
			 </div>	

		);
	}
}
export default UserYells;


 const styles = {
      drawer: {
        zIndex: 2
        },
      content: {
        fontSize: 11
        },
        fab:{
        	marginLeft:'80%',
        	marginTop:'65%'
        }
    }

