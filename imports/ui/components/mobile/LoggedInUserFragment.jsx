import React, { Component } from 'react';
import MainPlansFeed from './MainActivity/MainPlansFeed.jsx'
import UserPlansFeed from './MainActivity/UserPlansFeed.jsx'
import PublicPlansMap from './MainActivity/PublicPlansMap.jsx'
import UserNotificationsFeed from './MainActivity/UserNotificationsFeed.jsx'
import NotificationMenu from './MainActivity/notifications/NotificationMenu.jsx'
import { browserHistory } from 'react-router'
import SuggestionPawer from '../common/SuggestionPawer.jsx'
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserSettingsFrg from './MainActivity/UserSettingsFrg.jsx'
import emitter from './emitter.js'
import FontIcon from 'material-ui/FontIcon';
 class LoggedInUserFragment extends Component {
 	
 	constructor(props) {
 	  super(props);
 	  this.state = {
 	  	activeTab:0
 	  };
 	}
	changeLng(a){
		this.setState({lng:a})
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
								  <a className="active violet item" onClick={()=> this.setState({activeTab:4})} >
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
		<SuggestionPawer />
			 <Tabs
		          onChange={this.changeTab.bind(this)}
		          value={activeTab}
		          tabItemContainerStyle={styles.tabs} 
		          style={{backgroundColor:'rgb(63, 81, 181)'}}>	
						<Tab icon={<FontIcon className="material-icons">web</FontIcon>} value={0} />
						<Tab icon={<FontIcon className="material-icons">account_circle</FontIcon>} value={1} />
						<Tab icon={<NotificationMenu activeTab={activeTab}  />} value={2} />
						<Tab icon={<FontIcon className="material-icons">settings</FontIcon>} value={3} />
 			 </Tabs>
  		
				
				
			<SwipeableViews index={activeTab}
							animateTransitions={false}
							disabled={activeTab==4?true:false}
							onChangeIndex={this.changeTab.bind(this)}>
					<div><MainPlansFeed activeTab={activeTab} /> </div>
					<div><UserPlansFeed activeTab={activeTab} /> </div>
					<div><UserNotificationsFeed activeTab={activeTab} /></div>
					<div><UserSettingsFrg activeTab={activeTab} /></div>
					<div> <PublicPlansMap coordinates={this.props.coordinates} activeTab={activeTab} /> </div>
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

