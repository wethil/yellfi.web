import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';
import emitter from '../../emitter.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NtfLabel from '../YellTabs/NtfLabel.jsx'
import { browserHistory } from 'react-router'
import i18n from 'meteor/universe:i18n';
import Snackbar from 'material-ui/Snackbar';
import MainPlansFeed from './FragmentContainers/MainPlansFeed.jsx'
import UserPlansFeed from './FragmentContainers/UserPlansFeed.jsx'
import NotificationFeed from '../Notifications/NotificationFeed.jsx'
import UserSettingsCont from '../User/UserSettingsCont.jsx'
 class UserFragment extends Component {
 	constructor(props) {
	  super(props);
	
	  this.state = {
	  	snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:"",
	  	activeTab:0
	  };
	}
componentDidMount() {
 emitter.addListener('triggerSb', (sbState,sbMessage,sbType,snData)=> { 
      this.setState({
        snackbarState:sbState,
        snackbarMessage:sbMessage,
        snackbarType:sbType,
        snackbarData:snData
      })
    });
}

changeTab(value){		
	this.setState({activeTab:value})
	$('.fab').addClass('animated zoomIn');
	$('.fab').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>$('.fab').removeClass('animated zoomIn'));
	if (value==3) {
		$('.fab').toggleClass('hidden',true)
	} else {
		$('.fab').toggleClass('hidden',false)
	}
}

toogleDrawer () {
 // coordinates:[lng,lat], always stay lng lat
	lng = this.props.userCoord[0]
	lat = this.props.userCoord[1]
	browserHistory.push('/y/new'+ '?lng=' + lng + '&lat=' + lat  )
}



closeSb(){
   this.setState({
        snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:""
        })
}

undoAction(type,data) {
        Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              this.closeSb()
              browserHistory.push('/y/'+data)
            }
          });
}

	render() {
		userCoord=this.props.userCoord
		const {activeTab,snackbarType,snackbarData} = this.state
		
		return (
			
	<div>
		<Tabs  
		tabTemplateStyle={{zIndex:333}} 
		tabItemContainerStyle={styles.tabs}
		contentContainerStyle={{zIndex:444}} 
		inkBarStyle={{zIndex:222}}
		style={styles.tabs} 
		value={activeTab} 
		onChange={this.changeTab.bind(this)}>
			<Tab style={styles.tab_style} value={0}  icon={<FontIcon className="material-icons">web</FontIcon>} />
			<Tab style={styles.tab_style} value={1} icon={<FontIcon className="material-icons">account_circle</FontIcon>} /> 
			<Tab style={styles.tab_style} value={2}	 icon={<NtfLabel activeTab={activeTab} />} /> 
			<Tab style={styles.tab_style} value={3}	 icon={<FontIcon className="material-icons">settings</FontIcon>} />       	 
		</Tabs>

		<SwipeableViews 
				animateTransitions={false}
				index={activeTab} 
				onChange={this.changeTab.bind(this)}>
			<div> <MainPlansFeed activeTab={activeTab} /> </div>
			<div> <UserPlansFeed activeTab={activeTab}  /> </div>
			<div><NotificationFeed activeTab={activeTab} /></div>
			<div> <UserSettingsCont activeTab={activeTab} /> </div> 
		</SwipeableViews>

		<FloatingActionButton onClick={this.toogleDrawer.bind(this)} className="fab" style={styles.fab} >
			<ContentAdd />
		</FloatingActionButton>


		  <Snackbar
		    bodyStyle={{zIndex:9999}}
		    contentStyle={{zIndex:9999}}
		    style={{zIndex:9999}}
		      open={this.state.snackbarState}
		      message={this.state.snackbarMessage}
		      autoHideDuration={4000}
		      action={i18n.__('common.comments.undo')}
		      onActionTouchTap={ ()=>
		        this.undoAction(snackbarType,snackbarData)
		      }
		      onRequestClose={this.closeSb.bind(this)}
		    />

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
        },
        tabs:{
        	backgroundColor:'rgb(63, 81, 181)'
        }
    }
