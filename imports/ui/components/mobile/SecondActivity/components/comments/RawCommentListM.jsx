import React, { Component } from 'react';
import NoComment from './components/NoComment.jsx'
import { Dropdown } from 'semantic-ui-react';
import {grey800 } from 'material-ui/styles/colors';
import _ from 'lodash'
import { Notification } from 'react-notification';
import emitter from '../../../emitter.js';
import {plans,planCardStyles} from '../../../../constants.js'
import YellfiSuggestionsList from '../yellfiSuggestions/YellfiSuggestionsList.jsx'
import CircleShareButtons from '../others/CircleShareButtons.jsx'
import { browserHistory } from 'react-router';

 class RawCommentListM extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {snackbarText:"", comments:[],snackbarState:false,deletedComment:"",suggestions:[] };
 	}

  componentWillMount(){
  	emitter.emit('changeDialogAction','comment') //second Activity
  	const {comments,yellId,yellOwner,suggestions} = this.props
  	emitter.emit('getIDs',yellOwner,yellId)
    this.makePropState(comments,yellId,yellOwner,suggestions)
  }

  componentWillReceiveProps(nextProps){
  	const {comments,yellId,yellOwner,suggestions} = nextProps
  	emitter.emit('getIDs',yellOwner,yellId)
  this.makePropState(comments,yellId,yellOwner,suggestions)

}


  makePropState(comments,yellId,yellOwner,suggestions){
  this.setState({
  	comments:comments,
  	yellId:yellId,
  	yellOwner:yellOwner,
  	suggestions:suggestions
  })
}


 unlike  (comment) {
      Meteor.call('unlikeComment', comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
         // console.log('unliked')
        }
      });
   }


   like (comment,yellId,yellOwnerId){
      
        Meteor.call('likeComment', comment,yellOwnerId,yellId,  (error) => {
        if (error) {
          console.log(error)
        }else {
          //console.log('liked')
        }
      });
      
   }

   deleteComment(comment) {
  	this.setState({deletedComment:comment})
      Meteor.call('deleteComment', comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
        this.setState({sb:'delete'})
          this.setState({
          	snackbarState:true,
          	snackbarText:i18n.__('common.comments.deleteComment')
          })
        }
      });
       setTimeout(()=>{ this.closeSb() }, 2000);
   }

   closeSb(){
	 this.setState({
			          	snackbarState:false,
			          	snackbarText:""
			          })
}

    undoAction (commentId,commentOwner,yellId){
    	commentId = this.state.deletedComment
    	if (this.state.sb=='delete') {

	       Meteor.call('undoDeleteComment',  commentId,  (error) => {
	        if (error) {
	          console.log(error)
	        }else {
	          this.setState({snackbarState:false})
	        }
	      })
			   } else {
			   	const {commentId,commentOwner,yellId} = this.state
			   	this.undoBlock(commentId,commentOwner,yellId)
			   }
     

      } 

      undoBlock(commentId,commentOwner,yellId){
      	 Meteor.call('unblockUser',  commentId,commentOwner,yellId,  (error) => {
	        if (error) {
	          console.log(error)
	        }else {
	          this.setState({snackbarState:false})
	        }
	      })
      }

      blockUserFromComment(commentId,commentOwner,yellId){
      	this.setState({
      		commentId:commentId,
      		commentOwner:commentOwner,
      		yellId:yellId
      	})
        Meteor.call('blockUserFromComment',commentId, commentOwner, yellId,  (error) => {
        if (error) {
          console.log(error)
        }else {
        this.setState({sb:'block'})
          this.setState({
          	snackbarState:true,
          	snackbarText:i18n.__('common.comments.blockANuser')
          })
        }
      });
     
   }

   	inputSubmit(e){
	e.preventDefault()
	if (e.key == 'Enter') {
		let comCont = $('#commentInput').val()
		let yellId = this.state.yellId
 		let yellOwnerId = this.state.yellOwner._id

 
		Meteor.call('addComment',comCont,yellId,yellOwnerId,error=>{
			if (error) {
				console.log(error)
			} else {
				$('#commentInput').val("")
				 document.getElementById("commentInput").blur()
				
			}
		});	

	}
}

openJoinings(yellId){
	browserHistory.push('/y/'+yellId + '?dialog=joining')
}



	render() {
	const {comments,yellId,yellOwner,suggestions} = this.state
	yellOwnerId = yellOwner._id
	const {publicity,keyword} = this.props

prePlan=Number(this.props.plan)
	if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
	  plan = this.props.plan
	  custom = true
	} else {
	  plan =i18n.__(plans[prePlan].content)
	  custom = false
	}

	joiningButton = publicity ? <button onClick={()=>this.openJoinings(yellId)} className="ui right floated circular basic mini violet button">
										{i18n.__('common.YellCard.participation')} 
									</button>:null
	 actionButtons = 	<div>
				     	{joiningButton}
						<CircleShareButtons yellId={yellId} plan={plan} custom={custom} publicity={publicity} />     
					</div>

	planCard = 	<div className="ui centered fluid card card--z-2" >
					    <div className="content">	
					        <img  style={planCardStyles.avatar} className="left floated mini ui circular  image" src={yellOwner.picture} />				  
						     <div style={planCardStyles.header} className="header">
						    {yellOwner.firstName}
						      </div>
						      <div  className="description">
						       <span style={planCardStyles.desc}> {plan} </span>
						         <div style={planCardStyles.meta} className="meta">
						        	 {keyword}
						    	  </div>	
						    	   <div>{actionButtons}</div>
						      </div>
					    </div>
					    <div className="extra content">
					     
							{Meteor.userId()?
									 <div style={{marginTop:3}} className="ui fluid left icon input ">
											 <input type="text"
										  		 id="commentInput"   
										  		 onKeyUp={this.inputSubmit.bind(this)}
										  		 placeholder={i18n.__('common.comments.writeSugg')} /> 
									  		  <i className="user icon"></i>
										</div> :null
								}
					    </div>
					  </div>
		




		 if (suggestions && suggestions.length!=0) {
		 	suggestionList = <YellfiSuggestionsList  suggestions={suggestions} plan={this.props.plan} />
		 	haveSuggestions = true	
		 } else {
		 	console.log(suggestions)
		 	haveSuggestions = false
		 	suggestionList = null
		 }
		
	
		if (comments && comments.length > 0) {
			 var commentList = []
			 var User = Meteor.userId()
			 comments.forEach((comment)=>{

	 	yellOwnerSettings = (User && User == comment.yellOwnerId)?
			<Dropdown  pointing='right'  className='ui right floated top '>
				<Dropdown.Menu> 
					{User  != comment.ownerId ? <Dropdown.Item 
													icon="ban" 
													onClick={()=> this.blockUserFromComment(comment._id,comment.ownerId,yellId)}
													text={i18n.__('common.comments.block')} /> :null } 
					 <Dropdown.Item icon="trash" text={i18n.__('common.comments.delete')} onClick={()=> this.deleteComment(comment._id)} />
				</Dropdown.Menu>
			</Dropdown> : null;

			comentOwnerSettings = (User && User == comment.ownerId)?
				<div className="ui tiny   icon button" onClick={()=> this.deleteComment(comment._id)} >
					<i className="trash icon"/> 
				</div>:null;
						 	 



			 

		 likeButtonDecide= _.includes(comment.likes, Meteor.userId()) 
			                ? //like button. look state and change
			                 <div  onClick={ ()=> this.unlike(comment._id)} className="ui tiny basic red icon button"><i className="heart icon"/></div>
			                :
			               <div onClick={ ()=> this.like(comment._id,yellId,yellOwnerId)} className="ui tiny basic   icon button"><i className="empty heart icon"/></div>	  
						 	
			 	commentList.push(
						 <div className="ui centered fluid  card card--z-1" key={comment._id}>
						    <div className="content">
						      <img  style={styles.avatar} className="left floated mini ui circular  image" src={comment.owner.picture} />
						   
						      {yellOwnerSettings}
						      
						      <div style={styles.header} className="header">
						      {comment.owner.firstName} 
						      </div>
						      <div style={styles.meta} className="meta">
						        {moment(comment.created_at).startOf('minute').fromNow()}
						      </div>
						      <div  className="description">
						        {comment.content}
						      </div>
						    </div>
						    <div className="extra content">
						       	 <a href={"http://www.google.com/search?q="+"asd"} target="_blank"> 
                     					 <div className="ui tiny   labeled  icon button"><i className="google icon"/> {i18n.__('common.comments.search')} </div>
  								 </a>
  								 <a href={"https://www.youtube.com/results?search_query="+"asd"} target="_blank"> 
                     					 <div className="ui tiny   labeled  icon button"><i className="youtube icon"/> {i18n.__('common.comments.search')} </div>
  								 </a>
						       { (Meteor.userId() && Meteor.userId()!=comment.ownerId ) ? likeButtonDecide : null}

						        {comentOwnerSettings}
						    </div>
						  </div>	 		
			 		)
			 });
		} else {
			commentList = haveSuggestions ? null :  <NoComment />
		}


		return (
			<div className="ui container ">
			{planCard}
			
 					{commentList}
 					{suggestionList}
 					<Notification
					  isActive={this.state.snackbarState}
					  dismissAfter={2000}
					  message={this.state.snackbarText}
					  action={i18n.__('common.comments.undo')}
					  activeBarStyle={{zIndex:99,bottom:'1rem',left:'3rem'}}
					  onClick={ ()=> this.undoAction()}
					/>
				
			</div>
		);
	}
}
export default RawCommentListM;
    
const styles= {
	header:{
		marginLeft: '2.4em',
		color:'#4183c4'

	},
	meta:{
		marginLeft: '3.9em',
		fontSize:'0.8em'
	},

	avatar:{
		paddingBottom: '0em !important'
	},
	commentInput:{
		position:'fixed',
	    zIndex: 9999,
		bottom: '6%',
	    width: '92%'
	},
		mainButton:{
			position:'fixed',
		    zIndex: 9999,
			top: '89%',
		    width: '92%'
	}

}







/*
<div className="comment" key={comment._id}  >
						    <a className="avatar">
						      <img src={comment.owner.profile.avatar}/>
						    </a>
						    <div className="content">
						      <a className="author">{comment.owner.username}</a>
						      <div className="text">
						       {comment.content}
						      </div>
						      <div className="actions">
						        <a className="reply">Reply</a>
						        <a className="save">Save</a>
						        <a className="hide">Hide</a>
						        <a>
						          <i className="expand icon"></i>
						          Full-screen
						        </a>
						      </div>
						    </div>
						  </div>			


*/