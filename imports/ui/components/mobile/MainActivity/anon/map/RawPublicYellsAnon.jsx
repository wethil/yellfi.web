import React, { Component } from 'react';
import {grey800} from 'material-ui/styles/colors';
import {plans} from '../../../../constants.js';
import { browserHistory } from 'react-router'
import { Dropdown } from 'semantic-ui-react';
import emitter from '../../../emitter.js'
import _ from 'lodash';
import { Loader } from 'semantic-ui-react';
import VisibilitySensor from 'react-visibility-sensor';
import GreatCircle from 'great-circle';

class RawPublicYellsAnon extends Component {

constructor(props) {
	super(props);
	this.state = {
		plans : [],
		haveMore:false,
		sensor:true,
		loader:true
	};
}

handleVisibleSensor(isVisible){
	if (isVisible){
	this.setState({sensor:false})
	emitter.emit('increasePubYellLimitAnon')
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
	this.setState({sensor:true})
	yells = nextProps.yells;
	limit = nextProps.limit
	this.makePropState(yells)
	this.checkProps(yells,limit)
}



makePropState(data){
  this.setState({yells:data})
}

componentWillUnmount(){
	emitter.emit('resetPublicLimitAnon')
}

checkProps(newP,limit){
	console.log('yell ' + newP.length)
	console.log(limit)
	if(newP.length<limit) {//if plan quantity is lower than limit, this means there is no new plan
		this.setState({haveMore:false,sensor:false,loader:false})
	} else {
		this.setState({haveMore:true,sensor:true,loader:true})
	}	
}




openComments(yellId,ownerId){
	browserHistory.push('/yell/'+yellId + '?dialog=comment' )
}

openJoinings(yellId,ownerId){
	browserHistory.push('/yell/'+yellId + '?dialog=joining')
}





	render() {


	const {yells,userCoordinates} = this.props
	const {sensor} = this.state
if (yells && yells.length > 0) {
		planList = []
		yells.forEach( (yell) => {

	        let time = ` ${moment(yell.time).calendar()} `
		switch(yell.publicity) {
			case 0 : 
				publicity = i18n.__('common.publicity.alone')
			break;
			case 1:
				publicity = i18n.__('common.publicity.everyone')
			break;
			case 2:
				publicity = i18n.__('common.publicity.elected')
			break;		   
		}

	var User = Meteor.userId()
	

	yellCord=yell.publicPlanLoc.coordinates
	console.log(userCoordinates)
	console.log(yellCord)
	distance =	_.round(GreatCircle.distance(userCoordinates[1], userCoordinates[0], yellCord[1], yellCord[0]), 2);

						 	 


	prePlan=Number(yell.plan)
	if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
	  plan = yell.plan
	} else {
	  plan =i18n.__(plans[prePlan].content)
	}		
	cQ = yell.comment_quantity
	jQ = yell.joining_quantity
	commentQuantity = (cQ && cQ>0 )? `(${yell.comment_quantity})` :null
	joiningQuantity = (jQ&&jQ>0) ? `(${yell.joining_quantity})` :null

	if (yell.publicity == 0) {
	  publicityLabel =  <span>  <a className="ui mini circular label"><i className="user icon"></i> {publicity}</a>  </span>  
	  timeLabel =""
	} else {
	  publicityLabel= <span>  <a className="ui mini circular label"><i className="users icon"></i> {publicity}</a>  </span>  
	  timeLabel = <span style={styles.timeDate}> <a className="ui mini circular label"><i className="wait icon"></i> {time}</a> </span>
	                                                  
	}

	if(yell.publicity==0) {
		actionButtons =  <div style={styles.buttons} onClick={()=> this.openComments(yell._id, yell.ownerId )}
							  className="ui basic fluid green button">
								{i18n.__('common.YellCard.suggestions')} {commentQuantity}
						</div>
		
					       
					     
	} else {
		actionButtons =    <div className="ui two buttons">
					        <div style={styles.buttons} onClick={()=> this.openComments(yell._id, yell.ownerId )} className="ui basic green button">{i18n.__('common.YellCard.suggestions')}  {commentQuantity}</div>
					        <div style={styles.buttons} onClick={()=> this.openJoinings(yell._id, yell.ownerId )}	className="ui basic red button">{i18n.__('common.YellCard.participation')}  {joiningQuantity}</div>
					      </div>
	}



				planList.push(  
					<div className=" ui centered fluid card card--z-2" id={yell._id} key={yell._id}>
					    <div className="content">	
					        <img  style={styles.avatar} className="left floated mini ui circular  image" src={yell.owner.picture} />
							<div style={{fontSize:12,color:'#595858'}} className="ui right floated" > {distance} km </div>					  
						     <div style={styles.header} className="header">
						    {yell.owner.firstName}
						      </div>
						      <div className="meta">
						          {publicityLabel}  {timeLabel} 
						      </div>
						      <div  className="description">
						       <span style={styles.desc}> {plan} </span>
						         <div style={styles.meta} className="meta">
						        	 {yell.keyword}
						    	  </div>	
						      </div>
					    </div>
					    <div className="extra content">
					      {actionButtons}
					    </div>
					  </div>)

	}) 

	} else {
		planList = "no user plans"
	}
		return (
<div className="ui container" id="container" style={styles.frameStyle}>
				
<div id="pList" style ={styles.container} >
			    
        {planList}
     <VisibilitySensor 
     		partialVisibility={true}
     		 delayedCall={true}
     		 onChange={this.handleVisibleSensor.bind(this)}
     		 active={this.state.sensor} >  
 		 <Loader active={this.state.loader} inline='centered' />
 	</VisibilitySensor>		
</div>	
			
</div>
		);
	}
}
export default RawPublicYellsAnon;



  const styles = {
  	container:{
	  	position: 'fixed',
	    height: '44vh',
	    width: '92%',
	    overflow: 'scroll',
  	},
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
        },
        frameStyle:{
        	paddingTop: '75%',
        	marginBottom:150
        }

    }



