import React, { Component } from 'react';
import YellComposer from './components/YellComposer.jsx'
import { browserHistory } from 'react-router'

 class SecondActivity extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {yellId:"",modal:"ui active long modal"};
 	}

 	componentWillMount(){
			let yellId = this.props.params.id
			let dialog = this.props.location.query.dialog
			console.log(dialog)
			let lng = parseFloat(this.props.location.query.lng)
			let lat = parseFloat(this.props.location.query.lat)
			this.toogleModal(yellId,dialog,lng,lat)
			
	}


	componentWillReceiveProps(nextProps){
			let yellId = nextProps.params.id
			let dialog = nextProps.location.query.dialog
			let lng = parseFloat(nextProps.location.query.lng)
			let lat = parseFloat(nextProps.location.query.lat)
			this.toogleModal(yellId,dialog,lng,lat)
	}

	toogleModal(yellId,dialog,lng,lat){
	switch(yellId) {
	    case 'new':
		    this.setState({userCoordinates:[lng,lat],drwContent:0,drawerTitle:i18n.__('common.yellForm.newPlan')})
		    this.setState({modal:"ui  active  long modal"})
	        break;
	    case 'main':
	         this.setState({modal:"ui long modal"})
	        break;
	    default:
	        this.setState({drwContent:1, drawerTitle:"Plan",yellId:yellId})//make drawer content card. yellId came from RawYellList.js
			dialog ? this.setState({dialog:dialog}) : this.setState({dialog:'no'})
			this.setState({modal:"ui active long modal"})
			
		}
	}

	closeModal(){
		 browserHistory.push('/yell/main')
	}




	render() {
		const {dialog,yellId,modal} = this.state
		return (
			<div>
				<div className={modal} >
				  <i onClick={this.closeModal.bind(this)} className="close icon"></i>
				  <div className="header">
				    {this.state.drawerTitle}
				  </div>
				<div className="content">
				<YellComposer yellId={yellId} dialog={dialog} />	    

				  </div>
				  <div className="actions">
				    <div className="ui button">Cancel</div>
				    <div className="ui button">OK</div>
				  </div>
				</div>

			</div>
		);
	}
}
export default SecondActivity;