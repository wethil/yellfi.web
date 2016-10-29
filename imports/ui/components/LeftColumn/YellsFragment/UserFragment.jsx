import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserYells from '../Yells/UserYells.jsx'
import UserNotificationComposer from '../Notifications/UserNotificationComposer.jsx'
import OthersYells from '../Yells/OthersYells.jsx'
import ApprovedYells from '../Yells/ApprovedYells.jsx'
import SwipeableViews from 'react-swipeable-views';
import emitter from '../../emitter.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NoUserYell from '../Yells/YellsComponents/NoUserYell.jsx'
import NtfLabel from '../YellTabs/NtfLabel.jsx'
import { browserHistory } from 'react-router'


 class UserFragment extends Component {
 	constructor(props) {
	  super(props);
	
	  this.state = {
	  	activeTab:0,
	  	user:0,
	  	userHasYell:1,
	  	ntfsReceived:false,
	  	ntfLimit:10,
	  	userYellInfinite:10,
	  	othersActive:true
	  };
	}

	componentDidMount() {
	 emitter.addListener('ntfInfinite', ()=> { 
	      this.setState({ntfLimit:this.state.ntfLimit+5})
    });

	  emitter.addListener('userYellInfinite', ()=> { 
	      this.setState({userYellInfinite:this.state.userYellInfinite+5})
    });
	
	
		emitter.addListener('noUserYellAnim', ()=> {
			$('.fab').toggleClass('animated infinite tada')
		});
	}


	changeTab(value){
		switch(value) {
    case 0:
        this.setState({ntfsReceived:false,othersActive:true});     
        break;
    case 1:
		this.setState({ntfsReceived:false,othersActive:false});
        $('.fab').removeClass('animated infinite tada'); 
        break;
    case 2:
        this.setState({ntfsReceived:true,othersActive:false});
        $('.fab').removeClass('animated infinite tada'); 
        break;
}
		
		this.setState({activeTab:value})
		$('.fab').addClass('animated zoomIn');
		$('.fab').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>$('.fab').removeClass('animated zoomIn'));

	}

	toogleDrawer () {
		 // coordinates:[lng,lat], always stay lng lat
		 lng = this.props.ipLoc.coordinates[0]
		 lat = this.props.ipLoc.coordinates[1]
		browserHistory.push('/yell/new'+ '?lng=' + lng + '&lat=' + lat  )
	
	}


	handleLogout(e) {
		e.preventDefault()
		Meteor.logout();
		emitter.emit('userLogout')
		console.log('click logout')
	}

	noUserYellAnima() { //active if no user yell. Toogled From NoUserYell component
		console.log('nu user yell')
			$('.fab').addClass('animated infinite tada')
	}

	render() {
		ipLoc=this.props.ipLoc
		
		return (
			
	<div className="className">
		<Tabs value={this.state.activeTab} onChange={this.changeTab.bind(this)}>
			<Tab style={styles.tab_style} value={0}  label="FEED" />
			<Tab style={styles.tab_style} value={1} label="MY PLANS" /> 
			<Tab style={styles.tab_style} value={2}	 label={<NtfLabel notificationsReceived={this.state.ntfsReceived} />} />      	 
		</Tabs>

		<SwipeableViews index={this.state.activeTab} onChange={this.changeTab.bind(this)}>
			<div><OthersYells othersActive={this.state.othersActive}  ipLoc={ipLoc} /></div>
			<div> <UserYells  userYellInfinite={this.state.userYellInfinite} /> </div>
			<div><UserNotificationComposer ntfLimit={this.state.ntfLimit}/></div>
		</SwipeableViews>

		<FloatingActionButton onClick={this.toogleDrawer.bind(this)} className="fab" style={styles.fab} >
			<ContentAdd />
		</FloatingActionButton>

	</div>
		);
	}
}
export default UserFragment;



     const styles = {
        fab:{
          bottom: '5%',
          right:'4%',
          position:'absolute'
        },
        tab_style:{
        	color:'white'
        }


    }

/* <UserYells />
  <button 
		                 		className="ui button"
		                 		onClick={(e)=>{this.handleLogout(e)}}>
		                 		logout
		                 		</button>  */