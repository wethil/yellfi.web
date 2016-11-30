import React, { Component } from 'react';
import YellComposer from './components/YellComposer.jsx'
import { browserHistory } from 'react-router'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

 class SecondActivity extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	yellId:"",
 	  	commentText:""};
 	}

 	componentWillMount(){
			let yellId = this.props.params.id
			let dialog = this.props.location.query.dialog
			let owner = this.props.location.query.owner
			console.log(owner)
			let lng = parseFloat(this.props.location.query.lng)
			let lat = parseFloat(this.props.location.query.lat)
			this.toogleModal(yellId,owner,dialog,lng,lat)
			
	}


	componentWillReceiveProps(nextProps){
			let yellId = nextProps.params.id
			let dialog = nextProps.location.query.dialog
			let owner = nextProps.location.query.owner
			console.log(owner)
			let lng = parseFloat(nextProps.location.query.lng)
			let lat = parseFloat(nextProps.location.query.lat)
			this.toogleModal(yellId,owner,dialog,lng,lat)
	}

	toogleModal(yellId,owner,dialog,lng,lat){
	switch(yellId) {
	    case 'new':
		    this.setState({userCoordinates:[lng,lat],drwContent:0,drawerTitle:i18n.__('common.yellForm.newPlan')})
		    this.setState({modal:true})
	        break;
	    case 'main':
	         this.setState({modal:false})
	        break;
	    default:
	        this.setState({drwContent:1, owner:owner, drawerTitle:"Plan",yellId:yellId})//make drawer content card. yellId came from RawYellList.js
			dialog ? this.setState({dialog:dialog}) : this.setState({dialog:'no'})
			this.setState({modal:true})
			
		}
	}

	closeModal(){
		 browserHistory.push('/yell/main')
	}

inputSubmit(e){
	e.preventDefault()
	if (e.key == 'Enter') {
		let comCont = $('#commentInput').val()
		let yellId = this.state.yellId
 		let yellOwnerId = this.state.owner

 
		Meteor.call('addComment',comCont,yellId,yellOwnerId,error=>{
			if (error) {
				console.log(error)
			} else {
				$('#commentInput').val("")
				
			}
		});	
		console.log(comCont + yellId + ' ' + yellOwnerId )

	}
}

changeCommentInput(e){
		e.preventDefault()
	 	this.setState({commentText:e.target.value})
	 	console.log(e.target.value) 
}


	render() {
		$('.modal').modal({detachable: false});
		const {dialog,yellId,modal} = this.state
		switch (dialog) {
			case 'comment':
				modalAction =  <div className="ui fluid left icon input">
									 <input type="text"
							  		 id="commentInput"   
							  		 onKeyUp={this.inputSubmit.bind(this)}
							  		 placeholder="Write your suggestion." /> 
							  		  <i className="user icon"></i>
								</div> 
				break;
			case 'joining':
				modalAction =<button className="fluid ui button">Join</button>
				break;	
			default:
				modalAction =<span> default </span>
				break;
				
		}



		return (
	      <Modal  size="fullscreen" dimmer={true} open={modal} onClose={this.closeModal.bind(this)} >
          <Modal.Header>{this.state.drawerTitle}</Modal.Header>
          <Modal.Content >
           
			    <div style={{overflowY: 'scroll', height: '70vh', paddingTop:'3%'}}>

			       <YellComposer yellId={yellId} dialog={dialog}  />

			    </div>

          </Modal.Content>
          <Modal.Actions>
           
           		
					{modalAction}
				
          </Modal.Actions>
        </Modal> 
		);
	}
}
export default SecondActivity;





  /*
 <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.closeModal.bind(this)}  />
<div className="ui dimmer modals page transition visible active" >
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

  */


