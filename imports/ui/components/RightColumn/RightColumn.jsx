import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import emitter from '../emitter.js'
import YellForm from './YellForm/YellForm.jsx'
import YellCard from './YellCard/YellCard.jsx'

export default class RightColumn extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open:true,
	  	drwContent:0,
	  	yell:{},
	  	drawerTitle:"Create a Plan"
	  };
	}

	componentDidMount () {
		 emitter.addListener('toogleDrawerForForm', this.toogleDrawerForForm.bind(this));
		 emitter.addListener('toogleDrawerForCard', (yell)=> this.toogleDrawerForCard(yell));
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

	toogleDrawerForCard(yell) {
		console.log('toogledForCard')
		this.setState({drwContent:1, yell:yell, drawerTitle:"Plan" })//make drawer content form
		if(this.state.open==true && this.state.yell._id &&this.state.yell._id==yell._id) //if  user click same yell, close drawer
		{
			this.setState({open:false})
		}else {
			this.setState({open:true}) 
		}
		
	}

	render() {
			appBarCloseIcon = <IconButton onMouseDown={()=>this.setState({open:false})}> <NavigationClose /></IconButton>
		
		return (
			 <Drawer  
			 		containerStyle={styles.drawer} 
			 		width={280} 
			 		openSecondary={true} 
			 		open={this.state.open} >
			        
			        <AppBar //titleStyle={styles.plansTitle}
			        		title={this.state.drawerTitle}
			                iconElementLeft={appBarCloseIcon}/>
			        {this.state.drwContent==0 ? <YellForm /> : <YellCard yell={this.state.yell} /> }     
			      
			  </Drawer>
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