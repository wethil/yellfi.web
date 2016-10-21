import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import emitter from '../emitter.js'
import YellForm from './YellForm/YellForm.jsx'
import YellCardComposer from './YellCard/YellCardComposer.jsx'
import Snackbar from 'material-ui/Snackbar';
import { Session } from 'meteor/session'

export default class RightColumn extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open:true,
	  	drwContent:0,
	  	yellId:"",
	  	drawerTitle:"Create a Plan",
	  	sBar:false,
	  	sBarMessage:"",
	  	user:{},
	  	userCoordinates:{}
	  };
	}



	componentDidMount () {	
		 emitter.addListener('closeDrawerForBeBlocked', this.handleBlockUser.bind(this))
		
	}

	

	componentWillMount(){
			let yellId = this.props.params.id
			let dialog = this.props.location.query.dialog
			let lng = parseFloat(this.props.location.query.lng)
			let lat = parseFloat(this.props.location.query.lat)
	
			this.toogleDrawerWithContent(1,yellId,dialog,lng,lat)
			emitter.addListener('userInf',(user)=> this.getUserInf(user) )
	}


	componentWillReceiveProps (nextProps) {

		let yellId= nextProps.params.id
		let dialog = nextProps.location.query.dialog
		let lng = parseFloat(nextProps.location.query.lng)
		let lat = parseFloat(nextProps.location.query.lat)

		this.toogleDrawerWithContent(2,yellId,dialog,lng,lat)

			
	}


//state is when this func is triggerred. 1 is willmount, is receive props 2 
	toogleDrawerWithContent(state,yellId,dialog,lng,lat) {
		
		if (state == 1) {
			if (yellId!='new'){
				this.setState({drwContent:1, drawerTitle:"Plan",yellId:yellId,open:true})//make drawer content card. yellId came from RawYellList.js
				dialog ? this.setState({dialog:dialog}) : this.setState({dialog:'no'})
			} else {
				this.setState({userCoordinates:[lng,lat]})

				this.setState({drwContent:0, drawerTitle:"New Plan",open:true })
			} 
		} else {
			let drawerOpen = this.state.open
			let old_yellId = this.state.yellId
			let openState = (yellId==old_yellId && drawerOpen==true) ? false : true
			if (yellId!='new'){
				this.setState({drwContent:1, drawerTitle:"Plan",yellId:yellId,open:openState})//make drawer content card. yellId came from RawYellList.js
				dialog ? this.setState({dialog:dialog}) : this.setState({dialog:'no'})
			} else {
				this.setState({userCoordinates:[lng,lat]})
				this.setState({drwContent:0, drawerTitle:"New Plan",yellId:yellId, open:openState})
			} 
		}

			
	}


	handleBlockUser (){
		 this.setState({open:false})
		 this.setState({
		 	sBar:true,
		 	sBarMessage:"You do not have permission to see this plan anymore"
		 })
	}

	getUserInf (user) {
		this.setState({user:user})
	}

	

	render() {



		
			appBarCloseIcon = <IconButton onMouseDown={()=>this.setState({open:false})} > <NavigationClose style={{color:'white'}} /></IconButton>
		
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
			        {this.state.drwContent==0 
			        	?
			        	 <YellForm userCoordinates={this.state.userCoordinates} />
			       	  :
			        <YellCardComposer user={this.state.user}  dialog={this.state.dialog} yellId={this.state.yellId} />
			       }     
			      
			  </Drawer>

			  
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