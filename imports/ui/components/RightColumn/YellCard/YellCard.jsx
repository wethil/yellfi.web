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
import Avatar from 'material-ui/Avatar';
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Dropdown } from 'semantic-ui-react';
import SuggestionTextField from './SuggestionTextField.jsx'
import YellfiSuggestionsList from './YellfiSuggestionsList.jsx'
import NoSuggestion from './YellCardComponents/NoSuggestion.jsx'
import {PublicityLabel,ParticipationsButton} from './YellCardComponents/MiniComponents.jsx'
import NoYellOnCard from './YellCardComponents/NoYellOnCard.jsx'
import CircleShareButtons from '../../mobile/SecondActivity/components/others/CircleShareButtons.jsx';

 class YellCard extends Component {
 	constructor(props) {
 	  super(props);
 	  this.state = {
 	  	dialogOpen:false,
 	  	comment:"",
 	  	dialogContentNumber:0
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
		        this.setState({dialogContentNumber:1, dialogOpen:true})
		        break;
		    case 'joining':
		       this.setState({	dialogContentNumber:2, dialogOpen:true})
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
 		browserHistory.push('/y/'+yellId + '?dialog=close')
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
              		browserHistory.push('/')
              }        
          });
 		
 		
 	}

 	getActionLabelForJoinings(approved){
 		// action buttons label for joinings
 		actLblForJoinings =_.includes(approved, Meteor.userId())
 		? i18n.__('common.YellCard.approved'): i18n.__('common.YellCard.waitApprove');
 		return actLblForJoinings;
 	}

 	getActionBtnForJoinings(){
 		const {_id,publicity,ownerId,requests,approved} = this.state.yell
 		if(ownerId!=Meteor.userId())
		 {
			actBtnForJoinings =  _.includes(requests, Meteor.userId()) 
					?
				<FlatButton label={this.getActionLabelForJoinings(approved)} primary={true} disabled={true} />
					:
				<FlatButton label={i18n.__('common.YellCard.requestJoin')} 
							onTouchTap={()=>this.reqJoin(_id,publicity,ownerId)}  
							primary={true}  />
			} else {
				actBtnForJoinings = <FlatButton 
											label={i18n.__('common.YellCard.approveAll')} 
											 primary={true} 
											onTouchTap={()=>this.approveAll(_id,requests,approved)} />
		}

		return actBtnForJoinings
 	}


 	
 	


	render() {
		
	const {yell,dialogOpen,dialogContentNumber} = this.state
	const {_id,cQ,jQ,ownerId,requests,approved,publicity,owner,created_at,suggestionsByYellfi,keyword,time} = yell
	const {user,userBlocked} = this.props
	lang=i18n.getLocale();
	
	if (yell && yell.plan) {
		prePlan=Number(yell.plan)
	if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
		plan = yell.plan
		custom = true;
	} else {
		plan = i18n.__(plans[Number(prePlan)].content);
		custom = false ;

	}



	if (!userBlocked) {
		dialogTitleLabel =`${yell.owner.firstName} : ${plan}` 
		console.log(dialogContentNumber)
		switch(dialogContentNumber) {
		    case 1:
		    dialogContent = <CommentComposer 
		    					yellId={_id} 
		    					yellOwnerId={ownerId} /> 
		    dialogAction =  <SuggestionTextField 
							     	yellId={_id} 
							     	yellOwnerId={ownerId} />
						   
		        break;
		    case 2:
		  	dialogContent = <JoiningComposer yellId={_id} ownerId={ownerId} requests={requests} approved ={approved}/>
		    dialogAction =  this.getActionBtnForJoinings()
		        break;
		    default:
		    dialogContent =  "please do not play with url.."
		     dialogAction =  "no"
		}

	}  else {
		dialogContent = <BlockedUser />
	}

const action =userBlocked
	? 
	 [<span key={1} ><FlatButton label={i18n.__('common.YellCard.close')} primary={true} onTouchTap={()=> this.handleCloseDialogViaUrl(_id)}/></span>]
	: 
	[<span key={1}>{dialogAction}</span>]		
	
	dialogTitleButton=<span key={1} >
						   <FlatButton
						      label={dialogTitleLabel}
						      primary={true}
						      icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
						      onTouchTap={()=> this.handleCloseDialogViaUrl(_id)}
						    />
						</span>

		
		userHeader = (lang=="tr-TR" || lang =="tr")
		 ?
		<div className="anim">
		{owner.firstName}<br/>
		<span   style={styles.subhead}> {moment(created_at).startOf('hour').fromNow()} {i18n.__('common.YellCard.planned')}   </span>			
		
	  </div> 
	  :
	 <div className="anim">
		{owner.firstName} <br/>
		<span   style={styles.subhead}> {i18n.__('common.YellCard.planned')}  {moment(created_at).startOf('hour').fromNow()} </span>			
	  </div>  
			  



  if (Meteor.userId() && Meteor.userId()==yell.ownerId) {
  	settingsBtn =  <Dropdown pointing={true} className="mini primary icon left bottom basic teal" button={true} icon="setting">
					    <Dropdown.Menu>
					      <Dropdown.Item icon="facebook" text={i18n.__('common.YellCard.share')} />
					      <Dropdown.Item icon="twitter" text={i18n.__('common.YellCard.share')} />
					      <Dropdown.Item icon="trash" text={i18n.__('common.YellCard.delete')} onClick={()=> this.deleteYell(_id)} />
					    </Dropdown.Menu>
					  </Dropdown>
  }	else {
  	settingsBtn = null
  }
  

  suggestions = yell.suggestionsByYellfi

  currentUser = Meteor.userId()
  NoSuggestionFragment = (currentUser&&currentUser==yell.ownerId )?  <NoSuggestion plan={yell.plan} /> : <span></span>
suggestionFragment = (suggestions&&suggestions.length>0)?<YellfiSuggestionsList
																 plan={yell.plan}
																 suggestions={suggestions}  />:NoSuggestionFragment
															 
  comQ = cQ - suggestions.length
  commentQuantity = (comQ && comQ>0 )? `(${comQ})` :null
  joiningQuantity = (jQ&&jQ>0) ? `(${jQ})` :null


content = <div>
				  <Card>
			        <CardHeader
			          title={userHeader}
			          style={styles.cardHeader}
			          subtitle={ <span className="anim"><PublicityLabel publicity={publicity} /> </span> } 
			          avatar={owner.picture}
			        />
			      <CardTitle title={<span className="anim">{plan}</span> } 
								      		subtitle={<span>
								      					 {moment(time).calendar()} <br/>
								      					 <CircleShareButtons
								      					 		plan={plan} 
								      					 		custom = {custom}
								      					 		publicity={publicity==0?false:true}
								      					 		yellId={_id}
								      					 		/>

								      				</span>}
								      		subtitleStyle={{fontSize:13}} />
			        <CardText>
			        <span className="anim" style={{minHeight:51}} >{keyword}</span>
			        </CardText>
			        <CardActions>
			        {settingsBtn}
			         <button onClick={()=>  browserHistory.push('/y/'+_id + '?dialog=comment')}  className=" basic red mini ui  button">
							  {i18n.__('common.YellCard.suggestions')} {commentQuantity}
					</button>
			       <ParticipationsButton jq={joiningQuantity} yellId={_id} publicity={publicity} /> 
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
			          actions={action}
			          modal={false}
			          open={dialogOpen}
			          onRequestClose={()=> this.handleCloseDialogViaUrl(_id)}
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

