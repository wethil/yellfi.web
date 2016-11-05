import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CommentComposer from '../Comments/CommentComposer.jsx'
import JoiningComposer from '../Joining/JoiningComposer.jsx'
import Linkify from 'linkifyjs/react';
import emitter from '../../emitter.js';
import {plans} from '../../constants.js';
import BlockedUser from '../CommonComponents/BlockedUser.jsx'
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import { browserHistory } from 'react-router'
import DialogContent from './DialogContent.jsx'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton';
import { Dropdown } from 'semantic-ui-react';
import SuggestionTextField from './SuggestionTextField.jsx'

 class YellCard extends Component {
 	constructor(props) {
 	  super(props);
 	  this.state = {
 	  	dialogOpen:false,
 	  	comment:""
 	  };
 	}

 	componentWillMount(){
 		dialog = this.props.dialog
 		this.setDialogContent(dialog)
 		this.changeYell(this.props.yell)
 		
 	}

 	componentWillReceiveProps (nextProps) {
		dialog = nextProps.dialog
		console.log(dialog)
		this.setDialogContent(dialog)
		this.changeYell(nextProps.yell)
	}

	changeYell(yell){
		this.setState({yell:yell})
		$('.anim').addClass('animated fadeIn');
		$('.anim').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>$('.anim').removeClass('animated fadeIn'));
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

	reqJoin (yellId,publicity,yellOwnerId) {
	  Meteor.call('reqJoin', Meteor.userId(),yellId,publicity,yellOwnerId, error => { 
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

 	handleCloseDialogViaUrl (yellId){
 		this.setState({dialogOpen:false})
 		browserHistory.push('/yell/'+yellId + '?dialog=close')
 	}

 	componentWillUnmount(){
 		this.setState({dialogOpen:false})
 	}

 	deleteYell(yellId){
 		 emitter.emit('triggerSb',true,"You deleted a plan",'yell',yellId)

 		 Meteor.call('deleteYell',yellId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
              	  browserHistory.push('/')
              }        
          });
 		
 		
 	}
 	
 	


	render() {
		
	yell = this.state.yell
	
	prePlan=Number(yell.plan)
	if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
		plan = yell.plan
	} else {
		plan = plans[Number(prePlan)].content  
	}
// action buttons label for participants
	actLblForPartic =_.includes(yell.approved, Meteor.userId()) ? "Approved" : "Waiting for approve"
// action buttons for participants
	if(yell.ownerId!=Meteor.userId())
	 {
		actBtnForPartic =  _.includes(yell.requests, Meteor.userId()) 
				?
			<FlatButton label={actLblForPartic} primary={true} disabled={true} />
				:
			<FlatButton label="request to join" onTouchTap={()=>this.reqJoin(yell._id,yell.publicity,yell.ownerId)}  primary={true}  />
		} else {
			actBtnForPartic = <FlatButton label="Approve all" primary={true} onTouchTap={()=>this.approveAll(yell._id,yell.requests,yell.approved)} />
	}

	userAvatar = this.props.user.profile ? <Avatar src={this.props.user.profile.avatar}/> : <Avatar>U</Avatar>  
	if (!this.props.userBlocked) {
		switch(this.state.dialogContent) {
		    case 1:
		    dialogContent = <CommentComposer 
		    					yellId={yell._id} 
		    					yellOwnerId={yell.ownerId} /> 
		    dialogAction =  <List  key={1} >
							    <ListItem key={2}
							      style={{padding:"5px 16px 20px 72px "}}
							      disabled={true}
							      leftAvatar={userAvatar}>
							     <SuggestionTextField 
							     	yellId={yell._id} 
							     	yellOwnerId={yell.ownerId} />
							    </ListItem>
							   </List> 
			dialogTitleLabel =`${yell.owner.username} : ${yell.plan}` 			   
		        break;
		    case 2:
		  	dialogContent = <JoiningComposer yellId={yell._id} ownerId={yell.ownerId} requests={yell.requests} approved ={yell.approved} />
		    dialogAction =  actBtnForPartic
		    dialogTitleLabel = `${yell.owner.username} : ${yell.plan}` 	
		        break;
		    default:
		    dialogContent =  "please do not play with url.."
		     dialogAction =  "no"
		    dialogTitleLabel =`${yell.owner.username} : ${yell.plan}` 
		}

	}  else {
		dialogContent = <BlockedUser />
	}
		
	
	dialogTitleButton=<span key={1} >
						   <FlatButton
						      label={dialogTitleLabel}
						      primary={true}
						      icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
						      onTouchTap={this.handleCloseDialogViaUrl.bind(this,yell._id)}
						    />
						</span>

switch(yell.publicity) 
{
    case 0 : 
       publicityLabel = <span>  <a className="ui mini circular label"><i className="user icon"></i> Alone</a>  </span> 
       participationsButton = null
       break; 
    case 1:
       publicityLabel = <span><a className="ui mini circular label"><i className="users icon"></i>With Everyone</a> </span>  
       participationsButton = <button onClick={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=joining')} 
       								  className=" mini ui button teal">PARTICIPATION</button>
        break;
    case 2:
       publicityLabel = <span><a className="ui mini circular label"><i className="users icon"></i>Elected ones</a> </span>  
       participationsButton = <button onClick={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=joining')} 
       								  className=" mini ui button teal">PARTICIPATION</button>
        break;		   
}

		
		userHeader =  <div className="anim">
						{yell.owner.username} 
						<span   style={styles.subhead}> planned {moment(yell.created_at).startOf('hour').fromNow()} </span>			
					  </div>


const actions = this.props.userBlocked
				   ? 
				 [<span key={1} ><FlatButton label="CLOSE" primary={true} onTouchTap={ this.handleCloseDialogViaUrl.bind(this,yell._id)}/></span>]
				   : 
				[<span key={1}>{dialogAction}</span>]

  if (Meteor.userId() && Meteor.userId()==yell.ownerId) {
  	settingsBtn =  <Dropdown pointing={true} className="mini primary icon left bottom basic teal" button={true} icon="setting">
					    <Dropdown.Menu>
					      <Dropdown.Item icon="facebook" text='Share' />
					      <Dropdown.Item icon="twitter" text='Share' />
					      <Dropdown.Item icon="trash" text='Delete' onClick={()=> this.deleteYell(yell._id)} />
					    </Dropdown.Menu>
					  </Dropdown>
  }	else {
  	settingsBtn = null
  }
  
    


		return (
			<div>
				  <Card>
			        <CardHeader
			          title={userHeader}
			          style={styles.cardHeader}
			          subtitle={ <span className="anim">{publicityLabel}</span>} 
			          avatar={yell.owner.profile.avatar}
			        />
			      <CardTitle title={<span className="anim">{plan}</span> } 
			      		subtitle={moment(yell.time).calendar()}/>
			        <CardText>
			        <span className="anim">  <Linkify>  {yell.keyword} </Linkify> </span>    
			        </CardText>
			        <CardActions>
			        

			        {settingsBtn}
			        
			         <button onClick={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=comment')}  className="mini ui primary button">
							  SUGGESTION
							</button>

			         {participationsButton}
			  


							

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
			          onRequestClose={this.handleCloseDialogViaUrl.bind(this,yell._id)}
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
          fontSize:9.5,
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

