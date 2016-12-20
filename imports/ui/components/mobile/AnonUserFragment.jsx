import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import LogInPage from './MainActivity/anon/LogInPage.jsx'
import AnonFeed from './MainActivity/anon/AnonFeed.jsx'
import AnonPublicPlans from './MainActivity/anon/AnonPublicPlans.jsx'

 class AnonUserFragment extends Component {
 	 constructor(props) {
 	  super(props);
 	  this.state = {
 	  	activeTab:0
 	  };
 	}

changeTab(value){
		this.setState({activeTab:value})
	}	

	render() {
		const {activeTab} = this.state
		return (
	<div id="mainDiv" style={{height:'100vh',padding:'0px !important'}} >
			 <Tabs
		          onChange={this.changeTab.bind(this)}
		          value={activeTab}
		          tabItemContainerStyle={styles.tabs} 
		          style={{backgroundColor:'rgb(63, 81, 181)'}}>	
						<Tab icon={<FontIcon className="material-icons">exit_to_app</FontIcon>} value={0} />
						<Tab icon={<FontIcon className="material-icons">web</FontIcon>} value={1} />
						<Tab icon={<FontIcon className="material-icons">place</FontIcon>} value={2} />
 			 </Tabs>
  		
				
				
			<SwipeableViews index={activeTab}
							animateTransitions={false}
							disabled={activeTab==4?true:false}
							onChangeIndex={this.changeTab.bind(this)}>
					<div><LogInPage /> </div>
					<div> <AnonFeed activeTab={activeTab}  /> </div>
					<div><AnonPublicPlans activeTab={activeTab}  /> </div>
					
			</SwipeableViews>
			</div>
		);
	}
}
export default AnonUserFragment;

/*
	<div><MainPlansFeed activeTab={activeTab} /> </div>
					<div><UserPlansFeed activeTab={activeTab} /> </div>
					<div><UserNotificationsFeed activeTab={activeTab} /></div>
*/

const styles= {
	hidden:{
		display:'none',
		overflow:'hidden'
	},
	 tabs:{
        	backgroundColor:'rgb(63, 81, 181)',
        	position:'fixed',
        	zIndex:'999'
        }
}

