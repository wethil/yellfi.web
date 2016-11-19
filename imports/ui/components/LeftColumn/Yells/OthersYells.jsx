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
 	
 	  this.state = { limit:10 };
 	}

  componentDidMount(){
     emitter.addListener('incLimit', ()=> { 
        this.incLimit()
    });

  }

   incLimit() {

    this.setState({limit:this.state.limit+5})
  }
 

 /*
  incLimit(component) {
    switch(component) {
    case 1:
       this.setState({latestLimit:this.state.latestLimit+5})
        break;
    case 2:
         this.setState({limit:this.state.limit+5})
        break;
    default:
        this.setState({latestLimit:10,limit:10})
}
  } deactivated because of LatestYells deactivated
 
 */
  
 	


	render() {
		ipLoc=this.props.ipLoc
    const {limit} = this.state
		//content = this.state.botNavIndex==0 ?  <LatestYells limit={latestLimit} /> : <NearestYells limit={limit} ipLoc={ipLoc} />
    content = ipLoc.coordinates ?  <LatestYells limit={limit} ipLoc={ipLoc} /> : "wait......"

	
		return (
			 <div className="className">	
			 {
        this.props.othersActive?content:""
       }	  
			    
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

/* deactivated because of latestyells deactivated
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

*/