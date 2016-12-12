import React, { Component } from 'react';
import NoJoinings from './components/NoJoinings.jsx'
import emitter from '../../../emitter.js'
import _ from 'lodash'

 class RawJoiningListM extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	yell:{}
 	  };
 	}

 	componentWillMount(){
 		const {yell,requerers}=this.props
 		emitter.emit('changeDialogAction','joining') //second Activity
 		this.setState({yell:yell, requerers:requerers })
 		
 	}

 	componentWillReceiveProps (nextProps) {
 		const {yell,requerers}=nextProps
 		this.setState({yell:yell,requerers:requerers })
 	}

 	reqJoin (yellId,publicity,yellOwnerId) { //when current user decided to  join
	  Meteor.call('reqJoin', Meteor.userId(),yellId,publicity,yellOwnerId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
              	console.log('okey')
              }        
          });
	}

	cancelJoin (yellId)  { //when current user decided to forgive join
		userId = Meteor.userId()
   Meteor.call('cancelJoin',userId,yellId, error=> {
      if (error) {
        console.log(error)
      }else {
        console.log('cancelJoin')
      }
   });
 }

 approveJoin(requererId,yellId,yellOwnerId ){ //when current user decided to approve other's join
 	    Meteor.call('approveJoin',requererId,yellId,yellOwnerId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
                console.log('approveJoin')
              }                 
          });
 }


  cancelApprove(requererId,yellId,yellOwnerId ){ //when current user decided to cancel other's join
 	    Meteor.call('cancelApprove',requererId,yellId,yellOwnerId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
                console.log('cancelApprove')
              }                 
          });
 }

 

	JoiningButton(yellId, requests , approved  ){
		userId = Meteor.userId()
		if (_.includes(approved,userId)) {
			content = i18n.__('common.YellCard.approved')
			className = 'fluid ui basic red button'
		} else {
			content = i18n.__('common.YellCard.waitApprove')
			className = 'fluid ui basic teal button'
		}

		if ( _.includes(requests, userId ) ) {
			return (<button className={className} onClick={()=> this.cancelJoin(yellId)} > {content} </button>)
		} else {
			return (<button className="fluid ui basic blue button" onClick={()=> this.reqJoin(yellId)} > {i18n.__('common.YellCard.requestJoin')} </button>)
		}

	}

	approvingButton(requererId,yellId,yellOwnerId,approved ) {
		 if	( _.includes(approved, requererId) ) {
		 	return(	<div className="extra content" onClick={()=> this.cancelApprove(requererId,yellId,yellOwnerId)}  >
		 		 		<button className="fluid ui button basic red "> {i18n.__('common.YellCard.approved')} </button>
		 		 	 </div>
		 		 	)
		 } else {
		 	return(	<div className="extra content" onClick={()=> this.approveJoin(requererId,yellId,yellOwnerId)} >
		 		 		<button className="fluid ui button basic blue "> {i18n.__('common.YellCard.approveUser')}</button>
		 		 	 </div>
		 		 	)
		 }
	}

	approveAllButton (diff,yellId) {
		if (diff.length==0){
			return (<button className="fluid ui basic violet disabled button"> {i18n.__('common.YellCard.approveAll')} </button>)
		} else {
			return (
					<button className="fluid ui basic violet button" 
		 					onClick = { () => this.approveAll(diff,yellId)} >{i18n.__('common.YellCard.approveAll')}
		 			</button>
		 			)
		}
	}

		approveAll(diff,yellId) { // when plan owner decided to approve all requests
	
		  Meteor.call('approveAll',diff,yellId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
              	console.log('approveAll')
              }        
          });

	}


	render() {

		const {requerers} = this.state
		const {_id,publicity,ownerId,requests,approved } = this.state.yell
		 ownership = Meteor.userId() && Meteor.userId() == ownerId ? true : false 
		diff = _.difference(requests, approved);
		 if (ownership) {
		 	mainButton = this.approveAllButton(diff,_id)
		 } else {
		 	mainButton = this.JoiningButton(_id,requests,approved)
		 }

		

		requererList = []
	
		if (requerers && requerers.length>0) {
				requerers.forEach((requerer) => { //src={requerer.picture}
					requererList.push(
						 <div className="ui centered fluid  card card--z-1" >
						    <div className="content"> 
						      <img  style={styles.avatar} className="left floated mini ui circular  image" src={requerer.picture} />
						      <div style={styles.header} className="header">
						     	{requerer.firstName}
						      </div>
						    </div>
						     { ownership ? this.approvingButton(requerer._id,_id,ownerId,approved ) : null }
						  </div>	 	
						)
				});
		} else {
			requererList=<NoJoinings />
		}

		return (
			<div className="ui container "> 
				{requererList}

			<span style={styles.mainButton}> {mainButton}  </span>
				 </div>
		);
	}
}
export default RawJoiningListM;

const styles= {
	header:{
		marginLeft: '2.4em',
		color:'#4183c4',
		marginTop:'0.3em'

	},
	meta:{
		marginLeft: '3.9em',
		fontSize:'0.8em'
	},

	avatar:{
		paddingBottom: '0em !important'
	},
	mainButton:{
		position:'fixed',
	    zIndex: 9999,
		top: '89%',
	    width: '92%'
	}
}




