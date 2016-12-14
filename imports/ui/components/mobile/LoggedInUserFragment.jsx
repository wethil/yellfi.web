import React, { Component } from 'react';
import MainPlansFeed from './MainActivity/MainPlansFeed.jsx'
import UserPlansFeed from './MainActivity/UserPlansFeed.jsx'
import UserNotificationsFeed from './MainActivity/UserNotificationsFeed.jsx'
import NotificationMenu from './MainActivity/notifications/NotificationMenu.jsx'
import { browserHistory } from 'react-router'
import SuggestionPawer from '../common/SuggestionPawer.jsx'
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserComposer from './MainActivity/user/UserComposer.jsx'
 class LoggedInUserFragment extends Component {
 	
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	activeTab:0
 	  };
 	}

 	componentDidMount(){
 		
 	}

openForm(coord){
	console.log(coord)
	lng = coord[0]
	lat = coord[1]
	browserHistory.push('/yell/new'+ '?lng=' + lng + '&lat=' + lat  )
}

changeTab(value){
	this.setState({activeTab:value})
}	


	render() {
		const {coordinates} = this.props
		const {activeTab,cntStyle,ntfStyle} = this.state
		mainBottomNav =<div className="ui content">
							  <div className="ui inverted bottom fixed two item menu">
								  <a className="active violet item">
								  	<i className="marker icon"></i>
								  	{i18n.__('common.userFrg.pubPlans')}
								  </a>
								  <a className="active blue item" onClick={()=> this.openForm(coordinates)} >
								  	<i className="add icon"></i>
								  	{i18n.__('common.userFrg.createPlan')}
								  	</a>
							 </div>
						</div>



		return (
			<div id="mainDiv" style={{height:'100vh',padding:'0px !important'}} >
		
			 <Tabs
		          onChange={this.changeTab.bind(this)}
		          value={activeTab}
		          tabItemContainerStyle={styles.tabs} 
		          style={{backgroundColor:'rgb(63, 81, 181)'}}
		        >	
				<Tab label="One" value={0} />
				<Tab label="Two" value={1} />
				<Tab label="Three" value={2} />
				<Tab label="User" value={3} />
  </Tabs>
				
				
			<SwipeableViews
				index={activeTab}
				 onChangeIndex={this.changeTab.bind(this)}>
			<div>	<MainPlansFeed activeTab={activeTab} /> </div>
			<div>	<UserPlansFeed activeTab={activeTab} /> </div>
			<div>	<UserNotificationsFeed activeTab={activeTab} /></div>
			<div>	<UserComposer /></div>
			</SwipeableViews>
			{mainBottomNav}
			</div>
		);
	}
}
export default LoggedInUserFragment;


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

