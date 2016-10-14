import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CommentComposer from '../Comments/CommentComposer.jsx'
import JoiningComposer from '../Joining/JoiningComposer.jsx'
import TextField from 'material-ui/TextField';
import Linkify from 'linkifyjs/react';
import emitter from '../../emitter.js';
import BlockedUser from '../CommonComponents/BlockedUser.jsx'
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import { browserHistory } from 'react-router'
import DialogContent from './DialogContent.jsx'
import _ from 'lodash'

 class YellCard extends Component {
 	constructor(props) {
 	  super(props);
 	  this.state = {
 	  	dialogOpen:false
 	  };
 	}

 	componentWillMount(){
 		dialog = this.props.dialog
 		console.log(dialog)
 		this.setDialogContent(dialog)
 	}

 	componentWillReceiveProps (nextProps) {
		dialog = nextProps.dialog
		console.log(dialog)
		this.setDialogContent(dialog)
	}

	setDialogContent(dialog){
		switch(dialog) {
		    case 'comment': //1 is comment, 2 is joinings
		        this.setState({dialogContent:1, dialogOpen:true})
		        break;
		    case 'joining':
		       this.setState({	dialogContent:2, dialogOpen:true})
		        break;
		    default:
		        this.setState({dialogOpen:false})
		}
	}

	reqJoin (yellId) {
	  Meteor.call('reqJoin', Meteor.userId(),yellId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
              	console.log('okey')
              }        
          });
	}

	approveAll(yell,requests,approved) {
		diff = _.difference(requests, approved);
		console.log(diff)
		  Meteor.call('approveAll',diff,yell, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
              	console.log('approveAll')
              }        
          });
	

	}

 	toogleDialogFromLink(){
 		console.log('asd')
 		this.setState({dialogOpen:true})
 	}

 	handleCloseDialogViaUrl (){
 		browserHistory.push('/yell/'+yell._id)
 	}

 	componentWillUnmount(){
 		this.setState({dialogOpen:false})
 	}
 	

 	makeSuggestion()
 	{
 		let comCont = $('#suggestionInput').val()
 		let yellId = this.props.yell._id
 		let yellOwnerId = this.props.yell.ownerId
 		let ownerId = Meteor.userId();

 			
		Meteor.call('addComment',comCont,yellId,yellOwnerId,ownerId,function (error, result){
			if (error) {
				console.log(error)
			} else {
				console.log('okay')
				
			}
		});	
 	}

 	


	render() {
	yell = this.props.yell
	console.log(yell)
// action buttons label for participants
actLblForPartic =_.includes(yell.approved, Meteor.userId()) ? "Approved" : "Waiting for approve"
// action buttons for participants
      if(yell.ownerId!=Meteor.userId()) {
       actBtnForPartic =  _.includes(yell.requests, Meteor.userId()) 
         ?
        <FlatButton label={actLblForPartic} primary={true} disabled={true} />
               :
          <FlatButton label="request to join" onTouchTap={()=>this.reqJoin(yell._id)}  primary={true}  />

      } else {
      actBtnForPartic = <FlatButton label="Approve all" primary={true} onTouchTap={()=>this.approveAll(yell._id,yell.requests,yell.approved)} />
         
      }

	
	if (!this.props.userBlocked) {
		switch(this.state.dialogContent) {
		    case 1:
		    dialogContent = <CommentComposer yellId={yell._id}  /> 
		    dialogAction =  <List >
							    <ListItem
							      style={{padding:"5px 16px 20px 72px "}}
							      disabled={true}
							      leftAvatar={userAvatar}>
							     <TextField
								      className="suggestInput"
								      multiLine={true}
								      rows={1}
								      rowsMax={2}
								      id="suggestionInput"	
								      hintText="Make a suggestion or paste a link!  "
								      style={styles.commentInput}
								      textareaStyle={styles.textareaStyle}
								    />
							    </ListItem>
							   </List> 
			dialogTitleLabel ="suggestions"				   
		        break;
		    case 2:
		  	dialogContent = <JoiningComposer yellId={yell._id} ownerId={yell.ownerId} requests={yell.requests} approved ={yell.approved} />
		    dialogAction =  actBtnForPartic
		    dialogTitleLabel ="participants"	
		        break;
		    default:
		    console.log('erroritto')
		    dialogContent =  "please do not play with url.."
		     dialogAction =  "no"
		    dialogTitleLabel ="participants"	
		}

	}  else {
		dialogContent = <BlockedUser />
	}
		
	userAvatar = this.props.user.profile ? <Avatar src={this.props.user.profile.avatar}/> : <Avatar>U</Avatar>  
	dialogTitleButton=<span key={1} >
						   <FlatButton
						      label={dialogTitleLabel}
						      primary={true}
						      icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
						      onTouchTap={this.handleCloseDialogViaUrl.bind(this)}
						    />
						</span>

switch(yell.publicity) {
    case 0 : 
       publicityLabel = null 
    case 1:
       publicityLabel = <span><a className="ui mini circular label"><i className="users icon"></i>With Everyone</a> </span>  
        break;
    case 2:
       publicityLabel = <span><a className="ui mini circular label"><i className="users icon"></i>Elected ones</a> </span>  
        break;		   
}
		
		userHeader =  <div>
						{yell.owner.username} 
						<span style={styles.subhead}> planned {moment(yell.created_at).startOf('hour').fromNow()} </span>			
					</div>


const actions = this.props.userBlocked
				   ? 
				 [<span key={1} ><FlatButton label="CLOSE" primary={true} onTouchTap={ this.handleCloseDialogViaUrl.bind(this)}/></span>]
				   : 
				[<span key={1}>{dialogAction}</span>]
  
    


		return (
			<div>
				  <Card>
			        <CardHeader
			          title={userHeader}
			          style={styles.cardHeader}
			          subtitle={publicityLabel}
			          avatar={yell.owner.profile.avatar}
			        />
			      <CardTitle title={yell.plan} subtitle={moment(yell.time).calendar()}/>
			        <CardText>
			         <Linkify>   {yell.keyword}   </Linkify> 
			        </CardText>
			        <CardActions>
			         <FlatButton label="participants" onTouchTap={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=joining')}    />
			          <FlatButton label="suggest" onTouchTap={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=comment')}  />
			        </CardActions>
			      </Card>


	 <Dialog
			          //title="Scrollable Dialog"
			          className="justclass"
			          bodyClassName="dialogBody"
			          contentClassName="dialogContent"
			          overlayClassName="overlay"
			          actionsContainerClassName="actionsContainer"
			          contentStyle={styles.contentStyle}
			          actions={actions}
			          modal={false}
			          open={this.state.dialogOpen}
			          onRequestClose={this.handleCloseDialogViaUrl.bind(this)}
			          title={[dialogTitleButton]}
			          titleClassName="titleClass"
			          titleStyle={styles.titleStyle}
			          autoScrollBodyContent={true}
			          
			        >
   {dialogContent} 
       
        </Dialog>
</div>
		);
	

	}
}
export default YellCard;
		
 const styles = {
        subhead:{
          fontSize:11,
          color:'#9E9E9E'
        },
        commentInput: {
        	width:'74%'
          },
         contentStyle:{
         	marginTop:'-19%',
         	marginLeft:'23%',
         	position:'fixed'
         },
         titleStyle:{
         	padding:'0px 0px 0px 0px',
         	borderBottomStyle:'none'
         },
         textareaStyle:{
         	marginTop:0
         }	

    }
/*
hint
 bottom 23
 	
*/	


