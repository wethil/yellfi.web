import React, { Component } from 'react';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import {plans} from '../../../constants.js';
import { browserHistory } from 'react-router'
 class RawPlanList extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	plans : 5
 	  };
 	}


 	componentDidMount(){
 		$('.ui.container')
				  .visibility({
				    once: false,
				    // update size when new content loads
				    observeChanges: true,
				    // load content on bottom edge visible
				    onBottomVisible: ()=> {
				      // loads a max of 5 times
				      this.setState({plans:plans+5})
				    }
				  })
				;
 	}


 	openComments(yellId,ownerId){
 			  browserHistory.push('/yell/'+yellId + '?dialog=comment' + '&owner='+ ownerId )
 	}

 	openJoinings(yellId,ownerId){
 			 browserHistory.push('/yell/'+yellId + '?dialog=joining'+ '&owner='+ ownerId)
 	}

	render() {
	const {yells} = this.props
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



prePlan=Number(yell.plan)
if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
  plan = yell.plan
} else {
  plan =i18n.__(plans[prePlan].content)
}		

if (yell.publicity == 0) {
  publicityLabel =  <span>  <a className="ui mini circular label"><i className="user icon"></i> {publicity}</a>  </span>  
  timeLabel =""
} else {
  publicityLabel= <span>  <a className="ui mini circular label"><i className="users icon"></i> {publicity}</a>  </span>  
  timeLabel = <span style={styles.timeDate}> <a className="ui mini circular label"><i className="wait icon"></i> {time}</a> </span>
                                                  
}



			planList.push(  
				<div className=" ui centered fluid card" id={yell._id} key={yell._id}>
				    <div className="content">
				      <img className="right floated mini ui circular image" src="#"/>
				      <div className="header">
				    {yell.owner.firstName}
				      </div>
				      <div className="meta">
				          {publicityLabel}  {timeLabel} 
				      </div>
				      <div className="description">
				        {plan}
				         <div className="meta">
				        	 {yell.keyword}
				    	  </div>	
				      </div>
				    </div>
				    <div className="extra content">
				      <div className="ui two buttons">
				        <div onClick={()=> this.openComments(yell._id, yell.ownerId )} className="ui basic green button">Suggestions</div>
				        <div onClick={()=> this.openJoinings(yell._id, yell.ownerId )}	className="ui basic red button">Joinings</div>
				      </div>
				    </div>
				  </div>)

})
		return (
			<div className="className">
				
				<div className="ui container" style={{marginTop:60}}>
				{planList}
				</div>
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
        }

    }