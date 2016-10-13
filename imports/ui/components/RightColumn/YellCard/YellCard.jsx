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


 class YellCard extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	dialogOpen:false
 	  };


 	}

 	componentWillMount(){
 		dialog = this.props.dialog
 		this.setDialogContent(dialog)

 	}

 		componentWillReceiveProps (nextProps) {
		dialog = nextProps.dialog
		this.setDialogContent(dialog)
		

	}

	setDialogContent(dialog){
		switch(dialog) {
		    case 'comment':
		        this.setState({dialogContent:<CommentComposer  yellId={this.props.yell._id}  />, dialogOpen:true})
		       
		        break;
		    case 'joining':
		    yell = this.props.yell
		       this.setState({
		       	dialogContent:<JoiningComposer
		       						ownerId={yell.ownerId} 
		       						requests={yell.requests}
		       						approved={yell.approved}
		       						 />, 
				dialogOpen:true
				})
		       
		        break;
		    default:
		        this.setState({dialogOpen:false})
		}
	}


 	toogleDialogFromLink(){
 		console.log('asd')
 		this.setState({dialogOpen:true})
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

 	handleCloseDialogViaUrl (){
 		browserHistory.push('/yell/'+yell._id)
 	}

 	componentWillUnmount(){
 		this.setState({dialogOpen:false})
 	}


	render() {
	
		
		userAvatar = this.props.user.profile ? <Avatar src={this.props.user.profile.avatar}/> : <Avatar>U</Avatar>  


	dialogTitleButton=   <FlatButton
					      label="Suggestions"
					      icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
					      onTouchTap={this.handleCloseDialogViaUrl.bind(this)}
					    />
			




		yell = this.props.yell

	
		switch(yell.publicity) {
	        case 0 : 
	           publicity = "Alone"
		    case 1:
		        publicity = "With Everyone"
		        break;
		    case 2:
		        publicity = "Elected ones"
		        break;		   
		}

		if (yell.publicity!=0) {
			publicityLabel = <span><a className="ui mini circular label"><i className="users icon"></i>{publicity}</a> </span>  
		} else {
			publicityLabel=""
		}

		userHeader =  <div>
						{yell.owner.username} 
						<span style={styles.subhead}> planned {moment(yell.created_at).startOf('hour').fromNow()} </span>
						
					</div>


  const actions = this.props.userBlocked
   ? 
  
  <FlatButton
        label="CLOSE"
        primary={true}
        onTouchTap={ this.handleCloseDialogViaUrl.bind(this)}
      />
  
   : 

   <List >
    <ListItem
    	style={{padding:"5px 16px 20px 72px "}}
      disabled={true}
      leftAvatar={userAvatar}
    >
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
			         <FlatButton label="join" onTouchTap={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=joining')}    />
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
			          title={dialogTitleButton}
			          titleClassName="titleClass"
			          titleStyle={styles.titleStyle}
			          autoScrollBodyContent={true}
			          
			        >
     {this.props.userBlocked
      ? 
     <BlockedUser />
      : 
      this.state.dialogContent
     // 
        }    
       
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


