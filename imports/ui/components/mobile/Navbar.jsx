import React, { Component } from 'react';
import MainActivity from './MainActivity/MainActivity.jsx'
import UserNotificationsCompM from './MainActivity/notifications/UserNotificationsCompM.jsx'
import UserPlansComposer from './MainActivity/yells/UserPlansComposer.jsx'
import NotificationMenu from './MainActivity/notifications/NotificationMenu.jsx'

 class Navbar extends Component {
 	
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	activeTab:0
 	  };
 	}




	render() {
		const {activeTab,cntStyle,ntfStyle} = this.state
		switch(activeTab){
			case 0:
				content = <MainActivity />
				bottomMenu=	<div className="ui content">
							  <div className="ui inverted bottom fixed two item menu">
								  <a className="active violet item">
								  	<i className="marker icon"></i>
								  	{i18n.__('common.userFrg.pubPlans')}
								  </a>
								  <a className="active blue item">
								  	<i className="add icon"></i>
								  	{i18n.__('common.userFrg.createPlan')}
								  	</a>
							 </div>
						</div>
				break;
			case 1:
				content = <UserPlansComposer />
				 break;
		 
				 		 	
		}
		return (
			<div >
				<div className="ui fixed icon large inverted borderless menu" style={{backgroundColor:'#3f51b5'}}  >
				  <a className="item" onClick={()=>this.setState({activeTab:0,cntStyle:{},ntfStyle:styles.hidden})}>
				    <i className="large browser icon"></i>
				  </a>
				  <a className="item" onClick={()=>this.setState({activeTab:1,cntStyle:{},ntfStyle:styles.hidden})}>
				    <i className="large user icon"></i>
				  </a>
				<span onClick={()=>this.setState({activeTab:2,cntStyle:styles.hidden,ntfStyle:{} })} >
					<NotificationMenu activeTab={activeTab} />
				</span>
					
					
				</div>
				<span style={cntStyle} >
					{content}
					{bottomMenu}
				</span>
				<span style={ntfStyle} >
					<UserNotificationsCompM />
						<div className="ui content">
							<div className="ui inverted bottom fixed two item menu">
								<a className="active violet item">
									<i className="marker icon"></i>
									Public Plans
									</a>
								<a className="active blue item">
									<i className="add icon"></i>
									Create a Plan
								</a>
							</div>
						</div>	
				</span>
			</div>
		);
	}
}
export default Navbar;


const styles= {
	hidden:{
		display:'none'
	}
}
