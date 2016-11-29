import React, { Component } from 'react';
import NoComment from './components/NoComment.jsx'
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash'

 class RawCommentListM extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = { comments:[] };
 	}

  componentWillMount(){
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

	render() {
		
		 const {comments,yellId,yellOwnerId} = this.state
		
	
		if (comments && comments.length > 0) {
			 var commentList = []
			
			 comments.forEach((comment)=>{
			 	settingsBtn = (Meteor.userId() && Meteor.userId()== comment.ownerId ) ?  <Dropdown pointing='right' className="tiny  primary icon X bottom basic red" button={true} icon="setting">
					    <Dropdown.Menu>
					      <Dropdown.Item icon="ban" text={i18n.__('common.comments.block')} />
					      <Dropdown.Item icon="trash" text={i18n.__('common.YellCard.delete')} onClick={()=> this.deleteYell(yell._id)} />
					    </Dropdown.Menu>
					  </Dropdown> : null
		
		 likeButtonDecide= _.includes(comment.likes, Meteor.userId()) 
			                ? //like button. look state and change
			                 <div  onClick={ ()=> this.unlike(comment._id)} className="ui tiny basic red  icon button"><i className="heart icon"/></div>
			                :
			               <div onClick={ ()=> this.like(comment._id,yellId,yellOwnerId)} className="ui tiny basic red  icon button"><i className="empty heart icon"/></div>	  
						 	
			 	commentList.push(
						 <div className="ui centered fluid  card" key={comment._id}>
						    <div className="content">
						      <img  style={styles.avatar} className="left floated mini ui circular  image" src={comment.owner.picture} />
						      <div style={styles.header} className="header">
						      {comment.owner.firstName} 
						      </div>
						      <div style={styles.meta} className="meta">
						        {moment(comment.created_at).startOf('hour').fromNow()}
						      </div>
						      <div  className="description">
						        {comment.content}
						      </div>
						    </div>
						    <div className="extra content">
						       	 <a href={"http://www.google.com/search?q="+"asd"} target="_blank"> 
                     					 <div className="ui tiny basic red labeled  icon button"><i className="google icon"/> {i18n.__('common.comments.search')} </div>
  								 </a>
  								 <a href={"https://www.youtube.com/results?search_query="+"asd"} target="_blank"> 
                     					 <div className="ui tiny basic red labeled  icon button"><i className="youtube icon"/> {i18n.__('common.comments.search')} </div>
  								 </a>
						      {likeButtonDecide}
						        {settingsBtn}
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
			</div>
		);
	}
}
export default RawCommentListM;
    
const styles= {
	header:{
		marginLeft: '2.4em'
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