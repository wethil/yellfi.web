import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import emitter from '../emitter.js'
import YellForm from './YellForm/YellForm.jsx'
import YellCardComposer from './YellCard/YellCardComposer.jsx'
import Snackbar from 'material-ui/Snackbar';

export default class RightColumn extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open:true,
	  	drwContent:0,
	  	yellId:"",
	  	drawerTitle:"Create a Plan",
	  	sBar:false,
	  	sBarMessage:""
	  };
	}

	componentDidMount () {
		 emitter.addListener('toogleDrawerForForm', this.toogleDrawerForForm.bind(this));
		 emitter.addListener('toogleDrawerForCard', (yellId)=> this.toogleDrawerForCard(yellId));
		  emitter.addListener('closeDrawerForBeBlocked', this.handleBlockUser.bind(this))
	}

	toogleDrawerForForm() {
		console.log('toogled')
		if (this.state.drwContent==0) {
			drawerState = this.state.open ? false : true
			this.setState({open:drawerState})
		} else {
			this.setState({drwContent:0,drawerTitle:"Create a Plan"}) //make drawer content form
			this.setState({open:true})
		} 
		
		
	}

	toogleDrawerForCard(yellId) {
		console.log('toogledForCard')
		this.setState({drwContent:1, yellId:yellId, drawerTitle:"Plan" })//make drawer content form. yellId came from RawYellList.js
		if(this.state.open==true && this.state.yellId &&this.state.yellId==yellId) //if  user click same yell, close drawer
		{
			this.setState({open:false})
		}else {
			this.setState({open:true}) 
		}
		
	}

	handleBlockUser (){
		 this.setState({open:false})
		 this.setState({
		 	sBar:true,
		 	sBarMessage:"You do not have permission to see this plan anymore"
		 })
	}

	render() {
			appBarCloseIcon = <IconButton onMouseDown={()=>this.setState({open:false})}> <NavigationClose /></IconButton>
		
		return (
			<div className="className">

			 <Drawer  
			 		containerStyle={styles.drawer} 
			 		width={280} 
			 		openSecondary={true} 
			 		open={this.state.open} >
			        
			        <AppBar //titleStyle={styles.plansTitle}
			        		title={this.state.drawerTitle}
			                iconElementLeft={appBarCloseIcon}/>
			        {this.state.drwContent==0 ? <YellForm /> : <YellCardComposer yellId={this.state.yellId} /> }     
			      
			  </Drawer>

			   <Snackbar
                  open={this.state.sBar}
                  message={this.state.sBarMessage}
                  autoHideDuration={4000}
                  action="ok"
                  onActionTouchTap={()=>this.setState({sBar:false})}
          		  onRequestClose={()=>this.setState({sBar:false})}
            />
			</div>	
		);
	}
}




 const styles = {
      drawer: {
        zIndex: 2,
        overflowX: 'hidden'
        },
        plansTitle:{
        	fontSize:18
        },
      content: {
        fontSize: 11
        }
    }