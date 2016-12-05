import React, { Component } from 'react';
import NoComment from './components/NoComment.jsx'
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash'
import { Notification } from 'react-notification';
import emitter from '../../../emitter.js'

 class RawCommentListM extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = { comments:[],snackbarState:false,deletedComment:"" };
 	}

  componentWillMount(){
  	emitter.emit('changeDialogAction','comment') //second Activity
  	const {comments,yellId,yellOwnerId} = this.props
    this.makePropState(comments,yellId,yellOwnerId)
  }

  componentWillReceiveProps(nextProps){
  	const {comments,yellId,yellOwnerId} = nextProps
  this.makePropState(comments,yellId,yellOwnerId)

}


  makePropState(comments,yellId,yellOwnerId){
  this.setState({
  	comments:comments,
  	yellId:yellId,
  	yellOwnerId:yellOwnerId
  })
}


 unlike  (comment) {
      Meteor.call('unlikeComment', comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
          console.log('unliked')
        }
      });
   }


   like (comment,yellId,yellOwnerId){
      
        Meteor.call('likeComment', comment,yellOwnerId,yellId,  (error) => {
        if (error) {
          console.log(error)
        }else {
          console.log('liked')
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

	render() {
		
		 const {comments,yellId,yellOwnerId} = this.state
		
	
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
				<div className="ui tiny basic  icon button" onClick={()=> this.deleteComment(comment._id)} >
					<i className="trash icon"/> 
				</div>:null;
						 	 



			 

		 likeButtonDecide= _.includes(comment.likes, Meteor.userId()) 
			                ? //like button. look state and change
			                 <div  onClick={ ()=> this.unlike(comment._id)} className="ui tiny basic red icon button"><i className="heart icon"/></div>
			                :
			               <div onClick={ ()=> this.like(comment._id,yellId,yellOwnerId)} className="ui tiny basic   icon button"><i className="empty heart icon"/></div>	  
						 	
			 	commentList.push(
						 <div className="ui centered fluid  card" key={comment._id}>
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
                     					 <div className="ui tiny basic  labeled  icon button"><i className="google icon"/> {i18n.__('common.comments.search')} </div>
  								 </a>
  								 <a href={"https://www.youtube.com/results?search_query="+"asd"} target="_blank"> 
                     					 <div className="ui tiny basic  labeled  icon button"><i className="youtube icon"/> {i18n.__('common.comments.search')} </div>
  								 </a>
						       { (Meteor.userId() && Meteor.userId()!=comment.ownerId ) ? likeButtonDecide : null}

						        {comentOwnerSettings}
						    </div>
						  </div>	 		
			 		)
			 });
		} else {
			commentList = <NoComment />
		}


		return (
			<div className="ui container ">
 					{commentList}
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