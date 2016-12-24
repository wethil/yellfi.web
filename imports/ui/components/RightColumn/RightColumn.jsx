import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import emitter from '../emitter.js'
import YellForm from './YellForm/YellForm.jsx'
import YellCardComposer from './YellCard/YellCardComposer.jsx'
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from 'react-router'

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
	
			this.toogleDrawer(yellId,dialog,lng,lat)
	}


	componentWillReceiveProps (nextProps) {

		let yellId= nextProps.params.id
		let dialog = nextProps.location.query.dialog
		let lng = parseFloat(nextProps.location.query.lng)
		let lat = parseFloat(nextProps.location.query.lat)

		this.toogleDrawerAfterStart(yellId,dialog,lng,lat)

}

toogleDrawer(yellId,dialog,lng,lat) {
switch(yellId) {
    case 'new':
	    this.setState({userCoordinates:[lng,lat],drwContent:0,drawerTitle:i18n.__('common.yellForm.newPlan'),open:true })
        break;
    case 'main':
        this.setState({open:false}) 
        break;
    default:
        this.setState({drwContent:1, drawerTitle:"Plan",yellId:yellId,open:true})//make drawer content card. yellId came from RawYellList.js
		dialog ? this.setState({dialog:dialog}) : this.setState({dialog:'no'})
	}

}

toogleDrawerAfterStart(yellId,dialog,lng,lat){
		let drawerOpen = this.state.open
		let old_yellId = this.state.yellId
		if (yellId==old_yellId && drawerOpen==true && !dialog){
			browserHistory.push('/yell/main')
		} 
this.toogleDrawer(yellId,dialog,lng,lat)
	
}





	handleBlockUser (){
		 this.setState({open:false})
		 this.setState({
		 	sBar:true,
		 	sBarMessage:i18n.__('common.RightColumn.noPermission')
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
			        <YellCardComposer  dialog={this.state.dialog} yellId={this.state.yellId} />
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