import React, { Component } from 'react';
import YellComposer from './components/YellComposer.jsx'
import { browserHistory } from 'react-router'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import emitter from '../emitter.js'
import YellForm from './components/yellForm/YellForm.jsx'
import FacebookProvider, { Share } from 'react-facebook';



 class SecondActivity extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	yellId:"",
 	  	commentText:"",
 	  	dialog:"",
 	  	userCoordinates:[-88.175354,39.480200]
 	  };
 	}

 	componentDidMount(){
 		//YellFragment
 		emitter.addListener('changeDialogAction',(dialog) => {
 		 	this.setState({dialog:dialog  })
 		  });
 		emitter.addListener('fixModal',() => {
 			console.log('blur')
 		 	$(".ui.fullscreen.modal").css("margin-top","-257px");
 		  });
 		//JoiningList

 	}

 	componentWillMount(){

			let yellId = this.props.params.id
			let dialog = this.props.location.query.dialog
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
		    if(Meteor.userId()){
		    	this.setState({userCoordinates:[lng,lat],drwContent:0,drawerTitle:i18n.__('common.yellForm.newPlan')})
		    	this.setState({modal:true})
		    } else {
		    	browserHistory.push('/yell/main')
		    }
	        break;
	    case 'main':
	         this.setState({modal:false})
	        break;
	    default:
	        this.setState({drwContent:1, drawerTitle:"plan",yellId:yellId})//make drawer content card. yellId came from RawYellList.js
			dialog ? this.setState({dialogFromLink:dialog}) : this.setState({dialogFromLink:'no'})
			this.setState({modal:true})
			
		}
	}

	closeModal(){
		 browserHistory.push('/yell/main')
	}

	commentDialogActions(){

		if (Meteor.userId()){
			return (
				 <div>
				     	<button className="ui circular basic violet button">
									Joinings
						</button>
					<FacebookProvider appID="1307279049313135">
						        <Share href="https://atmospherejs.com/packages/trending">
						          	<button className="ui circular facebook basic blue icon button">
									  <i className="facebook icon"></i>
									</button>
						        </Share>
					 </FacebookProvider>
						 <a className="ui circular  twitter basic blue icon button"  href="https://twitter.com/intent/tweet?text=Hello%20world">
								  <i className="twitter icon"></i>
						</a>      
					</div>
			)
		} else {
			return (
					<button className="ui fluid facebook button">
					  <i className="facebook icon"></i>
					  Log in with Facebook
					</button>
				)
		}
	}



	render() {
		singInToSuggest = <button className="ui fluid facebook button">
								<i className="facebook icon"></i>
								Log in with Facebook to Suggest
						</button>		
		singInToJoin = <button className="ui fluid facebook button">
								<i className="facebook icon"></i>
								Log in with Facebook to Join
						</button>
							
		charlestonButton = <button className="fluid  disable ui blue button" style={{visibility:'hidden'}} > charleston IL </button>		
		
		$('.modal').modal({detachable: false});
		const {drwContent,dialogFromLink,yellId,modal,dialog,userCoordinates} = this.state
		console.log(dialog)
		switch (drwContent){
			case 1:
				modalContent =<div style={{overflowY: 'scroll', height: '70vh', paddingTop:'3%'}}> 
									 <YellComposer yellId={yellId} dialog={dialogFromLink}  />
								</div>	 
				switch (dialog) {
						case 'comment':
							modalAction = (!Meteor.userId()) ? singInToSuggest : null

							modalTitle = i18n.__('common.YellCard.suggestions')			
							break;
						case 'joining': 
							modalAction = (!Meteor.userId()) ? singInToJoin : charlestonButton
							modalTitle = i18n.__('common.YellCard.participation')				
							break;	
						case 'blocked':
							modalAction = <button className="fluid  ui basic red  button" onClick={this.closeModal.bind(this)} > {i18n.__('common.YellCard.close')}  </button>
							modalTitle="yellfi"
							break;	
						default:
							modalAction = null
							modalTitle="yellfi"
							break;
							
					}
				break;	
			case 0 :
				modalAction = null
				modalTitle = i18n.__('common.yellForm.newPlan')	
				modalContent =
								<div style={{overflowY: 'scroll', height: '77vh', paddingTop:'0%'}}>
										<YellForm coordinates={userCoordinates} />
								 </div>
						
				break;
			default:
				modalTitle="yellfi"
				modalAction="action"
				modalContent = "content"
		 	
}			



		return (
	      <Modal style={{marginTop:'-275px !important'}} size="fullscreen" dimmer={true} open={modal} onClose={this.closeModal.bind(this)} >
          <Modal.Header>
          	{modalTitle}
		  	<span onClick={this.closeModal.bind(this)}  
		  	   	  style={styles.iconContainer}
		  		  className="right aligned">  
		  		  	 <i  style={{cursor:'pointer'}} className="remove icon" /> 
		  	</span> 
          </Modal.Header>
          <Modal.Content >
			   
			      {modalContent}
			   
          </Modal.Content>
          <Modal.Actions>
           
           		
					{modalAction}
				
          </Modal.Actions>
        </Modal> 
		);
	}
}
export default SecondActivity;




 const styles = {
        iconContainer:{
            right: '1%',
   			position: 'fixed'
        }
    }


  /*
 <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.closeModal.bind(this)}  />
<div className="ui dimmer modals page transition visible active" >
				<div className={modal} >
				  <i onClick={this.closeModal.bind(this)} className="close icon"></i>
				  <div className="header">
				    {this.state.drwContent}
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


