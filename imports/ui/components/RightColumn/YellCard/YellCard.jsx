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
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Dropdown } from 'semantic-ui-react';
import SuggestionTextField from './SuggestionTextField.jsx'
import YellfiSuggestionsList from './YellfiSuggestionsList.jsx'
import NoSuggestion from './YellCardComponents/NoSuggestion.jsx'
import {PublicityLabel,ParticipationsButton} from './YellCardComponents/MiniComponents.jsx'
import NoYellOnCard from './YellCardComponents/NoYellOnCard.jsx'

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
 		 emitter.emit('triggerSb',true,i18n.__('common.YellCard.deletePlan')  ,'yell',yellId)

 		 Meteor.call('deleteYell',yellId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {

              	  Meteor.call('deleteNtf', yellId,  (error)=> {
              	  	if(error) {
              	  		console.log('error')
              	  	} else {
              	  		browserHistory.push('/')
              	  	}
              	  });
              }        
          });
 		
 		
 	}
 	
 	


	render() {
		
	yell = this.state.yell

	
	if (yell && yell.plan) {
		prePlan=Number(yell.plan)
	if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
		plan = yell.plan
	} else {
		plan = i18n.__(plans[Number(prePlan)].content) 
	}
// action buttons label for participants
	actLblForPartic =_.includes(yell.approved, Meteor.userId()) ? i18n.__('common.YellCard.approved'): i18n.__('common.YellCard.waitApprove')
	// action buttons for participants
	if(yell.ownerId!=Meteor.userId())
	 {
		actBtnForPartic =  _.includes(yell.requests, Meteor.userId()) 
				?
			<FlatButton label={actLblForPartic} primary={true} disabled={true} />
				:
			<FlatButton label={i18n.__('common.YellCard.requestJoin')} onTouchTap={()=>this.reqJoin(yell._id,yell.publicity,yell.ownerId)}  primary={true}  />
		} else {
			actBtnForPartic = <FlatButton label={i18n.__('common.YellCard.approveAll')} primary={true} onTouchTap={()=>this.approveAll(yell._id,yell.requests,yell.approved)} />
	}

	userAvatar = this.props.user.profile ? <Avatar src={this.props.user.profile.avatar}/> : <Avatar>U</Avatar>  
	if (!this.props.userBlocked) {
		dialogTitleLabel =`${yell.owner.username} : ${i18n.__(plans[yell.plan].content)}` 
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
						   
		        break;
		    case 2:
		  	dialogContent = <JoiningComposer yellId={yell._id} ownerId={yell.ownerId} requests={yell.requests} approved ={yell.approved} />
		    dialogAction =  actBtnForPartic
		        break;
		    default:
		    dialogContent =  "please do not play with url.."
		     dialogAction =  "no"
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


		
		userHeader =  <div className="anim">
						{yell.owner.username} 
						<span   style={styles.subhead}> planned {moment(yell.created_at).startOf('hour').fromNow()} </span>			
					  </div>


const actions = this.props.userBlocked
				   ? 
				 [<span key={1} ><FlatButton label={i18n.__('common.YellCard.close')} primary={true} onTouchTap={ this.handleCloseDialogViaUrl.bind(this,yell._id)}/></span>]
				   : 
				[<span key={1}>{dialogAction}</span>]

  if (Meteor.userId() && Meteor.userId()==yell.ownerId) {
  	settingsBtn =  <Dropdown pointing={true} className="mini primary icon left bottom basic teal" button={true} icon="setting">
					    <Dropdown.Menu>
					      <Dropdown.Item icon="facebook" text={i18n.__('common.YellCard.share')} />
					      <Dropdown.Item icon="twitter" text={i18n.__('common.YellCard.share')} />
					      <Dropdown.Item icon="trash" text={i18n.__('common.YellCard.delete')} onClick={()=> this.deleteYell(yell._id)} />
					    </Dropdown.Menu>
					  </Dropdown>
  }	else {
  	settingsBtn = null
  }
  
  suggestions = yell.suggestionsByYellfi
  NoSuggestionFragment = (Meteor.userId()&&Meteor.userId()==yell.ownerId )?  <NoSuggestion plan={yell.plan} /> : <span></span>
suggestionFragment = (suggestions&&suggestions.length>0)?<YellfiSuggestionsList
																 plan={yell.plan}
																 suggestions={suggestions}  />:NoSuggestionFragment

content = <div>
				  <Card>
			        <CardHeader
			          title={userHeader}
			          style={styles.cardHeader}
			          subtitle={ <span className="anim"><PublicityLabel publicity={yell.publicity} /> </span> } 
			          avatar={yell.owner.profile.avatar}
			        />
			      <CardTitle title={<span className="anim">{plan}</span> } 
								      		subtitle={moment(yell.time).calendar()}
								      		subtitleStyle={{fontSize:13}} />
			        <CardText>
			        <span className="anim">{yell.keyword}</span>
			        </CardText>
			        <CardActions>
			        {settingsBtn}
			         <button onClick={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=comment')}  className="mini ui primary button">
							  {i18n.__('common.YellCard.suggestions')}
							</button>
			       <ParticipationsButton publicity={yell.publicity} /> 
			        </CardActions>
			      </Card>
			    <span className="anim">  {suggestionFragment} </span>

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

	} else { content = <NoYellOnCard /> }

		return (
			<span>{content}</span>
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

