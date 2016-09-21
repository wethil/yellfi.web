import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import emitter from '../../emitter.js'
import YellForm from '../YellForm/YellForm.jsx'

export default class RightDrawer extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open:true
	  };
	}

	render() {
			appBarCloseIcon = <IconButton onMouseDown={()=>this.setState({open:false})}> <NavigationClose /></IconButton>
		 emitter.addListener('openDrawer', ()=>this.setState({open:true}) );
		return (
			 <Drawer  
			 		containerStyle={styles.drawer} 
			 		width={280} 
			 		openSecondary={true} 
			 		open={this.state.open} >
			        
			        <AppBar //titleStyle={styles.plansTitle}
			        		title={'Create a plan'}
			                iconElementLeft={appBarCloseIcon}/>
			        <YellForm />        
			      
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