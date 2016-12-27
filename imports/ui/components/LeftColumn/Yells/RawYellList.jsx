import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import CustomScroll from 'react-custom-scroll';
import NoUserYell from './YellsComponents/NoUserYell.jsx'
import NoYell from './YellsComponents/NoYell.jsx'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import emitter from '../../emitter.js'
import Snackbar from 'material-ui/Snackbar';
import {plans,listsDesktopStyles} from '../../constants.js';
import i18n from 'meteor/universe:i18n';
import VisibilitySensor from 'react-visibility-sensor'
import { Loader } from 'semantic-ui-react'

i18n.setOptions({
  hostUrl: 'http://'+window.location.hostname+':3000/'
});

 class RawYellList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:"",
        yells:[],
        haveMore:false,
        sensor:true,
        loader:true
    };
  }

componentWillMount(){
const {yells,limit} = this.props
  this.makePropState(yells)
  this.checkProps(yells, limit)
}

componentWillReceiveProps(nextProps){
  this.makePropState(nextProps.yells)
  this.checkProps(nextProps.yells, nextProps.limit)
  
}



makePropState(data){
  this.setState({yells:data})
}

checkProps(newP,limit){
  if(newP.length<limit) {//if plan quantity is lower than limit, this means there is no new plan
    this.setState({haveMore:false,sensor:false,loader:false})
  } else {
    this.setState({haveMore:true,sensor:true,loader:true})
  } 

}
  handleVisibleSensor(isVisible){
  if (isVisible){
    this.setState({sensor:false})
   if(this.props.component==0){
        emitter.emit('userPlanLimit') // will go UserYellsCont
      } else {
      
         emitter.emit('incLimit') //will go OthersYells
      }
  }
}


toogleYellCard(yellId) {
  browserHistory.push('/y/'+yellId)
}


undoAction(type,data) {
    switch(type) {
      case 'yell':
          Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              this.closeSb()
              browserHistory.push('/y/'+data)
            }
          });
          break;
      case 'comment':
            Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              console.log('ok')
            }
          });
          break;
      
  }
}

	render() {
    const {yells,sensor,loader} = this.state
	if (yells && yells.length > 0) {
      var yellList = []
      yells.forEach((yell) => {
      
        const {_id,publicity,time,keyword,plan,owner,created_at} = yell

    switch(publicity) {
        case 0 : 
           pubField = i18n.__('common.publicity.alone')
           pubClass = "user icon"
          timeLabel = moment(created_at).startOf('hour').fromNow()
           break;
		    case 1:
		        pubField = i18n.__('common.publicity.everyone')
            pubClass= "users icon"
            timeLabel =moment(time).calendar() 
		        break;
		    case 2:
		        pubField = i18n.__('common.publicity.elected')
            pubClass= "users icon"
            timeLabel =moment(time).calendar() 
		        break;		   
		}
    
    

keywordField = (keyword) ? `${timeLabel}  -- ${keyword}` : timeLabel


prePlan=Number(plan)
if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
  planField = plan
} else {
  planField =i18n.__(plans[prePlan].content)
}

		 yellList.push(
          <div  id={_id} key={_id}>
            <ListItem
                  onTouchTap={()=>this.toogleYellCard(_id)}
                  leftAvatar={<Avatar src={owner.picture} />}
                  primaryText={ 
                    <div style={listsDesktopStyles.username}>
                       {owner.firstName} 
                      <span>  <a className="ui mini circular label"><i className={pubClass} ></i> {pubField}</a>  </span>  
                       </div>
                    }
                  secondaryText={
                      	<p>   
                        <span style={listsDesktopStyles.plan}>{planField} </span> <br/>
                       <span style={listsDesktopStyles.keywords}> {keywordField} </span> 
                  		</p>
                  }
                  secondaryTextLines={2}
              />
            <Divider  inset={true} />
          </div>
        );

      });
    } else {
        switch(this.props.component) {
    case 0:
        emitter.emit('noUserYellAnim')
        yellList = <NoUserYell />
        break;
    case 1:
        yellList = "no yell"
        break;
      case 2:
        yellList = <NoYell />
        break;
    default:
         yellList="error"
}

    }

		return (
  <div className="sixteen wide column">
    <CustomScroll> 
      <List style={listsDesktopStyles.list} > 
      {yellList}
        <VisibilitySensor 
          partialVisibility={true}
          delayedCall={true}
          onChange={this.handleVisibleSensor.bind(this)}
          active={sensor} >  
           <div> <Loader style={{marginTop:2}} active={loader} inline='centered' /></div>
       </VisibilitySensor> 
      </List>
    </CustomScroll>
  </div>  
		);
	}
  componentWillUnmount(){
       if(this.props.component==0){
          emitter.emit('resetUPLimit') // will go UserYellsCont
        } else {
        
         emitter.emit('resetMPLimit') //will go MainPlansFeed
      }
  }

}
export default RawYellList;