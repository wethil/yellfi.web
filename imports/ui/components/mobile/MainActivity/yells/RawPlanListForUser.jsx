import React, { Component } from 'react';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import {plans} from '../../../constants.js';
import { browserHistory } from 'react-router'
import NoUserPlans from './YellsComponents/NoUserPlans.jsx'
import { Dropdown ,Loader } from 'semantic-ui-react';
import { Notification } from 'react-notification';
import VisibilitySensor from 'react-visibility-sensor';
import emitter from '../../emitter.js';
import  {frameStyle} from './YellsComponents/constant.js'
import _ from 'lodash';


 class RawPlanListForUser extends Component {
 	constructor(props) {
	super(props);
	this.state = {
		plans : [],
		snackbarState:false,
		snackbarText:"",
		haveMore:false,
		sensor:true,
		loader:true
	};
}

handleVisibleSensor(isVisible){
if (isVisible){
	this.setState({sensor:false,loader:true})
	console.log('inctp')
	emitter.emit('increaseUPLimit')

	}
}

componentWillMount(){
	this.setState({sensor:true})
	yells = this.props.yells;
	limit = this.props.limit;
	this.makePropState(yells)
	this.checkProps(yells, limit)

}

componentWillReceiveProps(nextProps){
	yells = nextProps.yells;
	limit = nextProps.limit
	this.makePropState(yells)
	this.checkProps(yells,limit)
}

componentWillUnmount(){
	emitter.emit('resetUPLimit')
}


makePropState(data){
  this.setState({yells:data})
}

checkProps(newP,limit){
	if(newP.length<limit) {//if plan quantity is lower than limit, this means there is no new plan
		this.setState({haveMore:false,sensor:false,loader:false})
		console.log('active false')
	} else {
		this.setState({haveMore:true,sensor:true,loader:true})
	}
}

openComments(yellId,ownerId){
  browserHistory.push('/y/'+yellId + '?dialog=comment' + '&owner='+ ownerId )
}

openJoinings(yellId,ownerId){
 browserHistory.push('/y/'+yellId + '?dialog=joining'+ '&owner='+ ownerId)
}

deleteYell(yellId,ownerId){
	this.setState({activeYellId:yellId,activeOwnerId:ownerId})
	Meteor.call('deleteYell',yellId, error => { 
		if (error) { 
			console.log('error', error); 
		} else {
			this.setState({
			snackbarState:true,
			snackbarText:i18n.__('common.YellCard.deletePlan')
			})
		}        
	});
	setTimeout(()=>{ this.closeSb() }, 2000);	
}


undoAction() {
const {activeYellId} = this.state
	Meteor.call('undoDeleteYell',activeYellId,error=> {
	if (error) {
		console.log(error)
	} else {
		browserHistory.push('/y/'+activeYellId + '?dialog=comment')
	}
	});
}

closeSb(){
	this.setState({
		snackbarState:false,
		snackbarText:""
	})
}

	render() {


	const {yells} = this.props
	const {snackbarState,snackbarText,sensor,loader} = this.state

if (yells && yells.length > 0) {
		planList = []
		yells.forEach( (yell) => {
			const {_id,publicity,cQ,jQ,ownerId,plan,owner,keyword,time,created_at} = yell
	
	commentQuantity = (cQ && cQ>0 )? `(${cQ})` :null
	joiningQuantity = (jQ&&jQ>0) ? `(${jQ})` :null

		switch(publicity) {
			case 0 : 
				pubText = i18n.__('common.publicity.alone');
				publicityClass = "user icon";
				timeLabel = moment(created_at).startOf('hour').fromNow();
				actionButtons =  <div style={styles.buttons} onClick={()=> this.openComments(_id, ownerId )}
						  className="ui basic fluid green button">
							{i18n.__('common.YellCard.suggestions')} {commentQuantity}
					</div>;
			break;
			case 1:
				pubText = i18n.__('common.publicity.everyone');
				publicityClass = "users icon";
				timeLabel =moment(time).calendar();
				actionButtons = <div className="ui two buttons">
				        <div style={styles.buttons} onClick={()=> this.openComments(_id, ownerId )} className="ui basic green button">{i18n.__('common.YellCard.suggestions')}  {commentQuantity}</div>
				        <div style={styles.buttons} onClick={()=> this.openJoinings(_id, ownerId )}	className="ui basic red button">{i18n.__('common.YellCard.participation')}  {joiningQuantity}</div>
				      </div>
			break;
			case 2:
				pubText = i18n.__('common.publicity.elected');
				publicityClass = "users icon";
				timeLabel =moment(time).calendar();
				actionButtons = <div className="ui two buttons">
				        <div style={styles.buttons} onClick={()=> this.openComments(_id, ownerId )} className="ui basic green button">{i18n.__('common.YellCard.suggestions')}  {commentQuantity}</div>
				        <div style={styles.buttons} onClick={()=> this.openJoinings(_id, ownerId )}	className="ui basic red button">{i18n.__('common.YellCard.participation')}  {joiningQuantity}</div>
				      </div>
			break;		   
		}

	var User = Meteor.userId()
	yellOwnerSettings = (User && User == ownerId)?
				<Dropdown  pointing='right'  className='ui right floated top '>
				<Dropdown.Menu> 
					 <Dropdown.Item icon="trash" text={i18n.__('common.comments.delete')} onClick={()=> this.deleteYell(_id,ownerId)} />
				</Dropdown.Menu>
			</Dropdown> : null;
					



	prePlan=Number(plan)
	if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
	  planLabel = plan
	} else {
	  planLabel =i18n.__(plans[prePlan].content)
	}		
	keywordField = (keyword) ? `${timeLabel}  -- ${keyword}` : timeLabel

planList.push(  
		<div className=" ui centered fluid card card--z-2" id={_id} key={_id}>
		    <div className="content">	
		        <img  style={styles.avatar} className="left floated mini ui circular  image" src={owner.picture} />
				{yellOwnerSettings}					  
			     <div style={styles.header} className="header">
			    {owner.firstName}
			      </div>
			      <div className="meta">
			         <span>  <a className="ui mini circular label"><i className={publicityClass} ></i> {pubText}</a>  </span>   
			      </div>
			      <div  className="description">
			       <span style={styles.desc}> {planLabel} </span>
			         <div style={styles.meta} className="meta">
			        	 {keywordField}
			    	  </div>	
			      </div>
		    </div>
		    <div className="extra content">
		      {actionButtons}
		    </div>
		  </div>)

	}) 

	} else {
		planList = <NoUserPlans />
	}
		return (
<div className="ui container" id="container" style={frameStyle}>
	{planList}
	<VisibilitySensor 
		partialVisibility={true}
		delayedCall={true}
		onChange={this.handleVisibleSensor.bind(this)}
		active={sensor}
		>  
			 <Loader active={loader} inline='centered' />
	</VisibilitySensor>	


	<Notification
		isActive={snackbarState}
		dismissAfter={2000}
		message={snackbarText}
		action={i18n.__('common.comments.undo')}
		activeBarStyle={{zIndex:150,bottom:'4rem',left:'5rem'}}
		onClick={ ()=> this.undoAction()}
		onDismiss={()=>this.setState({
		snackbarState:false,
		snackbarText:""
		})}
	/>
</div>
		);
	}
}
export default RawPlanListForUser;



  const styles = {
        list:{
          height: '80.6vh',
          backgroundColor:'white'
        },
      header: {
        //marginLeft: '2.4em',
		color:'rgb(65, 131, 196)'  //'#4183c4'
        },
      meta: {
      	fontWeight:100
        //marginLeft: '3.9em',
        //fontSize:'0.8em'
        },
      timeDate: {
        color: grey800
        },  
       keywords:{
        fontSize:12
        },
        avatar:{
          paddingBottom: '0em !important'
        },
        desc:{
        	fontWeight:'bolder',
        	fontSize: 16
        },
        buttons:{
        	padding : '0.78571429em 1em 0.78571429em 1em'
        }

    }



