import React, { Component } from 'react';
import _ from 'lodash'

 unlike = (comment) => {
      Meteor.call('unlikeComment', comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
          console.log('unliked')
        }
      });
   }


   like =(comment,yellId,yellOwnerId) => {
      Meteor.call('likeComment', comment,yellOwnerId,yellId,  (error) => {
        if (error) {
          console.log(error)
        }else {
          console.log('liked')
        }
      });
   }


 
 const LikeButton = (props) => {
likes = props.likes
commentId = props.commentId
yellId=props.yellId
yellOwnerId=props.yellOwner
if (Meteor.userId()  ) {
  likeButtonDecide= _.includes(likes, Meteor.userId()) 
                ? //like button. look state and change
                 <div  onClick={ ()=> unlike(commentId)} className="ui tiny basic red  icon button"><i className="heart icon"/></div>
             
                :
               <div onClick={ ()=> like(commentId,yellId,yellOwnerId)} className="ui tiny basic red  icon button"><i className="empty heart icon"/></div>
   } else {
     likeButtonDecide = null
   }
   return ( <span> {likeButtonDecide} </span> );

}

 export default LikeButton

