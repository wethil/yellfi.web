import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import NoYellComment from './CommentsComponents/NoYellComment.jsx'
import SearchButton from './CommentsComponents/SearchButton.jsx'
import FontIcon from 'material-ui/FontIcon';
import Linkify from 'linkifyjs/react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import _ from 'lodash'
import CustomScroll from 'react-custom-scroll';
import Snackbar from 'material-ui/Snackbar';

 class RawCommentsList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      comments:1,
      count:0,
      propDuplicate:1,
      snackbarState:false,
      snackbarData:""
    };
  }

  componentWillMount(){
    this.makePropState(this.props.comments)
  }

  componentWillReceiveProps(nextProps){
  this.makePropState(nextProps.comments)

}


  makePropState(data){
  this.setState({comments:data})
}



   like(comment) {
    yellOwnerId = this.props.yellOwnerId
    yellId = this.props.yellId
      Meteor.call('likeComment', comment,yellOwnerId,yellId,  (error) => {
        if (error) {
          console.log(error)
        }else {
          console.log('liked')
        }
      });
   }


   unlike(comment) {
      Meteor.call('unlikeComment', comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
          console.log('unliked')
        }
      });
   }

   deleteComment(comment) {
    this.setState({snackbarData:comment})
      Meteor.call('deleteComment', comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
          this.setState({snackbarState:true})
        }
      });
   }

  undoAction (comment){
       Meteor.call('undoDeleteComment',  comment,  (error) => {
        if (error) {
          console.log(error)
        }else {
          this.setState({snackbarState:false,snackbarData:""})
        }
      });
  }
   blockUserFromComment(commentId,commentOwner,yellId){
        Meteor.call('blockUserFromComment',commentId, commentOwner, yellId,  (error) => {
        if (error) {
          console.log(error)
        }else {
         console.log(('blocked'))
        }
      });
     
   }

 


	render() {
   
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip={i18n.__('common.comments.more')}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);





	if (this.state.comments && this.state.comments.length > 0) {
      var comments = []
   //loop started   
 this.state.comments.forEach((comment) => {
 let likeButton= _.includes(comment.likes, Meteor.userId()) 
                ? //like button. look state and change
                <MenuItem onTouchTap={ ()=> this.unlike(comment._id)}> {i18n.__('common.comments.unlike')} </MenuItem>
                :
                <MenuItem onTouchTap={()=> this.like(comment._id)}> {i18n.__('common.comments.like')} </MenuItem>


            let STL = comment.content.length >113 ? 2 : 1 //secondary text lines
            let content = comment.content.replace(/ /g, "+")

    let searchOnGoogle =  <SearchButton searchUrl="http://www.google.com/search?q=" searchContent={content} iconClass="google icon" />
    let searchOnYoutube =  <SearchButton searchUrl="https://www.youtube.com/results?search_query=" searchContent={content} iconClass="youtube icon" />
    		

    switch(Meteor.userId()) {
        
        case comment.ownerId:
               rightIconMenu = (
          <IconMenu iconButtonElement={iconButtonElement}>
           {likeButton}
             <MenuItem onTouchTap={()=> this.deleteComment(comment._id)}>{i18n.__('common.comments.delete')}</MenuItem>
          </IconMenu>
        );
            break;
        case comment.yellOwnerId:
               rightIconMenu = (
                <IconMenu iconButtonElement={iconButtonElement}>
                 {likeButton}
                  <MenuItem onTouchTap={()=> this.deleteComment(comment._id)}>{i18n.__('common.comments.delete')}</MenuItem>
                 <MenuItem onTouchTap={()=> this.blockUserFromComment(comment._id,comment.ownerId,comment.yellId)} >{i18n.__('common.comments.block')}</MenuItem>
                </IconMenu>
           );

            break;
        default:
            rightIconMenu = (
                <IconMenu iconButtonElement={iconButtonElement}>
                  {likeButton}
                </IconMenu>
           );
    }










         comments.push(
              <div key={comment._id}>
                <ListItem key={comment._id}
                      disabled={true}
                        rightIconButton={rightIconMenu}
                      disabled={true}
                      leftAvatar={<Avatar src={comment.owner.profile.avatar} />}
                      primaryText={
                       <div style={styles.username}>{comment.owner.username}
                           <span style={styles.subhead} className="hiddenOnMobile" > {i18n.__('common.comments.suggested')} </span> 
                           <span style={styles.searchRow}>  <span className="hiddenOnMobile" style={styles.subhead}>{i18n.__('common.comments.searchThis')}</span>  {searchOnGoogle} | {searchOnYoutube} </span>
                           </div>
                         }
                      secondaryText={
                          	<p>   
                              <span style={styles.keywords}>
                             <Linkify>  {comment.content} </Linkify> 
                                </span>
                      		</p>
                      }
                      secondaryTextLines={STL}
                  />
                <Divider  inset={true} />
              </div>
            );

   });
    } else {
          

comments = <NoYellComment />

    }










		return (
  <div style={styles.listSegment} className="commentFragment">
      <List style={styles.list} > 
        {comments}
      </List>  

{/* if add drawer here, it will rendered on left column itself */}
      <Snackbar
          open={this.state.snackbarState}
          message={i18n.__('common.comments.deleteComment')}
          autoHideDuration={4000}
          action={i18n.__('common.comments.undo')}
          onActionTouchTap={ ()=>
            this.undoAction(this.state.snackbarData)
          }
          onRequestClose={()=>
            this.setState({
              snackbarState:false,
              snackbarData:""
              })
            }
    
        />
  </div>  
		);
	}
}
export default RawCommentsList;


     const styles = {
        list:{
          backgroundColor:'white'
        },
      username: {
        color: lightBlue900
        },
      plan: {
        color: grey800
        },
      timeDate: {
        color: grey800
        },  
       keywords:{
        fontSize:12
        },
        subhead:{
          fontSize:11,
          color:'#9E9E9E'
        },
        searchIcon:{
          color:'#B71C1C'
        },
        searchRow :{
          marginLeft:'53%'
        },
        listSegment:{
          height:'54vh',
          maxHeight:'84vh'
        }

    }


