import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Login from '../Accounts/Login.jsx'
import Register from '../Accounts/Register.jsx'
import LatestYells from '../Yells/OthersYells/LatestYells.jsx'
import SwipeableViews from 'react-swipeable-views';
import OthersYells from '../Yells/OthersYells.jsx'



 class AnonFragment extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	activeTab:0,
 	  	othersActive:false
 	  };
 	}

 		changeTab(value){
	 switch(value) {
	    case 0:
	        this.setState({othersActive:false});     
	        break;
	    case 1:
			this.setState({othersActive:true});
	        break;
		}
		this.setState({activeTab:value})
	}


	render() {
		console.log(this.state.activeTab)
		return (
			 <div>	
			 	<Tabs  
					tabTemplateStyle={{zIndex:333}} 
					tabItemContainerStyle={styles.tabs}
					contentContainerStyle={{zIndex:444}} 
					inkBarStyle={{zIndex:222}}
					style={styles.tabs} 
					value={this.state.activeTab} 
					onChange={this.changeTab.bind(this)}>
			<Tab style={styles.tab_style} value={0} label={i18n.__('common.anonFrg.login')} /> 
			<Tab style={styles.tab_style} value={1}  label={i18n.__('common.anonFrg.feed')} />
		
		</Tabs>
		  <SwipeableViews index={this.state.activeTab} onChange={this.changeTab.bind(this)}>
		  		<div>  <Login /> <Register />  </div>
			<OthersYells othersActive={this.state.othersActive}  ipLoc={this.props.ipLoc} />
		</SwipeableViews>
		
		      </div>
		);
	}
}
export default AnonFragment;


     const styles = {
        tab_style:{
        	color:'white'
        },
        tabs:{
        	backgroundColor:'rgb(63, 81, 181)'
        }


    }
