import React, { Component } from 'react';
import UserYells from './UserYells.jsx'
import LatestYells from './OthersYells/LatestYells.jsx'
import NearestYells from './OthersYells/NearestYells.jsx'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import emitter from '../../emitter.js'
import LoadingCircle from './YellsComponents/LoadingCircle.jsx'


const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const locationIcon = <FontIcon className="material-icons">location_on</FontIcon>;

 class OthersYells extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = { botNavIndex: 0};
 	}
 
  
 	


	render() {
		ipLoc=this.props.ipLoc
		content = this.state.botNavIndex==0 ?  <LatestYells height={'73.6vh'} /> : <NearestYells height={'73.6vh'} ipLoc={ipLoc} />

	
		return (
			 <div className="className">	
			 {content}	  


	 <div id="bottomNav" >
	 	<Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.botNavIndex}>
          <BottomNavigationItem
            label="Recents"
            icon={recentsIcon}
           onTouchTap={() => this.setState({botNavIndex: 0})}
          />
          <BottomNavigationItem
            label="Nearby"
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
export default OthersYells;


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

