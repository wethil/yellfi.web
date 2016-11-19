import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserYells from '../Yells/UserYells.jsx'
import UserNotificationComposer from '../Notifications/UserNotificationComposer.jsx'
import OthersYells from '../Yells/OthersYells.jsx'
import SwipeableViews from 'react-swipeable-views';
import emitter from '../../emitter.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NoUserYell from '../Yells/YellsComponents/NoUserYell.jsx'
import NtfLabel from '../YellTabs/NtfLabel.jsx'
import { browserHistory } from 'react-router'
import i18n from 'meteor/universe:i18n';
import Snackbar from 'material-ui/Snackbar';
 class UserFragment extends Component {
 	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:"",
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
		      emitter.addListener('triggerSb', (sbState,sbMessage,sbType,snData)=> { 
      this.setState({
        snackbarState:sbState,
        snackbarMessage:sbMessage,
        snackbarType:sbType,
        snackbarData:snData
      })
    });
	 emitter.addListener('ntfInfinite', ()=> { 
	      this.setState({ntfLimit:this.state.ntfLimit+5})
    });

	  emitter.addListener('userYellInfinite', ()=> { 
	      this.setState({userYellInfinite:this.state.userYellInfinite+5})
    });
	
	}


	changeTab(value){
		switch(value) {
    case 0:
        this.setState({ntfsReceived:false,othersActive:true});     
        break;
    case 1:
		this.setState({ntfsReceived:false,othersActive:false});
     
        break;
    case 2:
        this.setState({ntfsReceived:true,othersActive:false});
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

	closeSb(){
   this.setState({
        snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:""
        })
}

	render() {
		ipLoc=this.props.ipLoc
		
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
			<Tab style={styles.tab_style} value={0}  label={i18n.__('common.userFrg.feed')} />
			<Tab style={styles.tab_style} value={1} label={i18n.__('common.userFrg.myPlans')} /> 
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
		  <Snackbar
		    bodyStyle={{zIndex:9999}}
		    contentStyle={{zIndex:9999}}
		    style={{zIndex:9999}}
		      open={this.state.snackbarState}
		      message={this.state.snackbarMessage}
		      autoHideDuration={4000}
		      action={i18n.__('common.comments.undo')}
		      onActionTouchTap={ ()=>
		        this.undoAction(this.state.snackbarType,this.state.snackbarData)
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

/* <UserYells />
  <button 
		                 		className="ui button"
		                 		onClick={(e)=>{this.handleLogout(e)}}>
		                 		logout
		                 		</button>  */