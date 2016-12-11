import React, { Component } from 'react';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import {plans} from '../../../constants.js';
import { browserHistory } from 'react-router'
import NoUserPlans from './YellsComponents/NoUserPlans.jsx'
import { Dropdown } from 'semantic-ui-react';
import { Notification } from 'react-notification';
import ScrollMagic from 'scrollmagic';
import emitter from '../../emitter.js'
import _ from 'lodash'

 class RawPlanList extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	plans : [],
 	  	snackbarState:false,
 	  	snackbarText:"",
 	  	haveMore:false,
 	  	lastYellId:"#lastcont"
 	  };
 	}


 	
 componentDidMount(){
 	var controller = new ScrollMagic.Controller();
 	var scene = new ScrollMagic.Scene({triggerElement: "#lastEl", triggerHook: "onEnter"})
					.addTo(controller)
					.on("enter",  (e)=> {
							if(this.state.haveMore==true){
									$('#loader').toggleClass('active',true)
										switch (this.props.component) {
											case 0:
												emitter.emit('increaseLimit')
											break;
											case 1:
												emitter.emit('increaseUPLimit')
											break;		

										}
									 	
									 	scene.update()									 	
									 }
					});

 	}

componentWillMount(){
  this.makePropState(this.props.yells)
   this.checkProps(this.props.yells, this.props.limit)
}

componentWillReceiveProps(nextProps){
  this.makePropState(nextProps.yells)
  this.checkProps(nextProps.yells, nextProps.limit)
  
}


makePropState(data){
  this.setState({yells:data})
}

checkProps(newP,limit){
	console.log( newP.length + ' ' + limit )
	//document.getElementById("div_top2").setAttribute("id", "div_top1");
  if(newP.length<limit) {//if plan quantity is lower than limit, this means there is no new plan
  	console.log('false')
      this.setState({haveMore:false})
      $('#loader').toggleClass('active',false)
      } else {
        this.setState({haveMore:true})
      }

      if(newP && newP.length != 0) {
			  last = _.last(newP);
			  lastId=last._id
			  this.setState({lastYellId:lastId})
			  $('#' + lastId).attr("id", "lastEl");
			   $('.loader').attr("id", "loader");

			
			} else {
			  lastId=""
			}


}




 	openComments(yellId,ownerId){
 			  browserHistory.push('/yell/'+yellId + '?dialog=comment' + '&owner='+ ownerId )
 	}

 	openJoinings(yellId,ownerId){
 			 browserHistory.push('/yell/'+yellId + '?dialog=joining'+ '&owner='+ ownerId)
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
 		yellId = this.state.activeYellId
 		ownerId= this.state.activeOwnerId
 		    Meteor.call('undoDeleteYell',yellId,error=> {
            if (error) {
              console.log(error)
            } else {
             
              browserHistory.push('/yell/'+yellId + '?dialog=comment' + '&owner='+ ownerId )

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
	const {snackbarState,snackbarText} = this.state
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
	yellOwnerSettings = (User && User == yell.ownerId)?
				<Dropdown  pointing='right'  className='ui right floated top '>
				<Dropdown.Menu> 
					 <Dropdown.Item icon="trash" text={i18n.__('common.comments.delete')} onClick={()=> this.deleteYell(yell._id,yell.ownerId)} />
				</Dropdown.Menu>
			</Dropdown> : null;
						 	 


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
		actionButtons =  <div onClick={()=> this.openComments(yell._id, yell.ownerId )}
							  className="ui basic fluid green button">
								Suggestions {commentQuantity}
						</div>
		
					       
					     
	} else {
		actionButtons =    <div className="ui two buttons">
					        <div onClick={()=> this.openComments(yell._id, yell.ownerId )} className="ui basic green button">Suggestions {commentQuantity}</div>
					        <div onClick={()=> this.openJoinings(yell._id, yell.ownerId )}	className="ui basic red button">Joinings {joiningQuantity}</div>
					      </div>
	}



				planList.push(  
					<div className=" ui centered fluid card card--z-2" id={yell._id} key={yell._id}>
					    <div className="content">	
					        <img  style={styles.avatar} className="left floated mini ui circular  image" src={yell.owner.picture} />
							{yellOwnerSettings}					  
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
		planList = <NoUserPlans />
	}
		return (
<div className="ui container" id="container" style={{marginTop:67,marginBottom:70}}>
				
		    
        {planList}
<div>        
 <div  id="lastEl" className="ui active centered inline loader"></div>
 </div>
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
export default RawPlanList;



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
        }

    }



