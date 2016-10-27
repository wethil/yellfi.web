import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import CustomScroll from 'react-custom-scroll';
import { browserHistory } from 'react-router'
import { Session } from 'meteor/session'
import emitter from '../../emitter.js'
import Snackbar from 'material-ui/Snackbar';
import _ from 'lodash';
import  verge from 'verge';


 class RawYellList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      notifications:[],
       snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:"",
        propDuplicate:1,
        firstCount:0
    };
  }

  componentDidMount() {
   
      emitter.addListener('triggerSb', (sbState,sbMessage,sbType,snData)=> { 
      this.setState({
        snackbarState:sbState,
        snackbarMessage:sbMessage,
        snackbarType:sbType,
        snackbarData:snData
      })
    });
  }

  componentWillMount() {
      this.setState({
        firstCount:this.props.notifications.length
      })
     this.makePropState(this.props.notifications)
    this.sendNotificationsToTabTitle(this.props.notifications)
  }

  componentWillReceiveProps(nextProps){
   
   if (nextProps.notifications && nextProps.notifications.length!=0) {
     head = _.head(nextProps.notifications)
    this.checkNtfForTime(head)
   }
   
    this.sendNotificationsToTabTitle(nextProps.notifications)
    this.makePropState(nextProps.notifications)
    this.checkProps(nextProps.notifications, nextProps.limit)
  }

  checkNtfForTime(ntf){

    ntfTime= moment(ntf.created_at).utc()
    now=moment().utc()
    pastTime =  moment(now).subtract(3, 'seconds')
    if (moment(ntfTime).isAfter(pastTime)){
      emitter.emit('triggerNtf',ntf)
  
    } 
  
  }

sendNotificationsToTabTitle(notifications){
  unreceivedNtf= _.map(_.filter(notifications, function(o) { return !o.received; }), '_id');
  
  emitter.emit('changeBadgeContent',unreceivedNtf)
  
}


toogleYellCard(yellId,about) {
 
    switch(about) {
      case 'yell':
           browserHistory.push('/yell/'+yellId) 
          break;
      case 'comment':
           browserHistory.push('/yell/'+yellId + '?dialog=comment')
          break;
      case 'like':
           browserHistory.push('/yell/'+yellId + '?dialog=comment')
          break;
      case 'participation':
           browserHistory.push('/yell/'+yellId + '?dialog=joining')
          break;
  }
}

closeSb(){
   this.setState({
        snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:""
        })
}

undoAction(type,data) {
    switch(type) {
      case 'yell':
          Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              this.closeSb()
              browserHistory.push('/yell/'+data)
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

handleScroll(lastId){
  var lastElement = document.getElementById(lastId);
   if (verge.inViewport(lastElement)==true && this.state.propDuplicate<2) {
    console.log(this.state.propDuplicate)
    emitter.emit('ntfInfinite')
  } 
}

makePropState(data){
  this.setState({notifications:data})
}

checkProps(newP,limit){


  if(newP.length<limit) {
        console.log('no new yell')
         this.setState({propDuplicate:this.state.propDuplicate + 1})
      } else {
        this.setState({propDuplicate:0})
        console.log('there is new yell')
      }

}

	render() {

if(this.state.notifications && this.state.notifications.length != 0) {
  last = _.last(this.state.notifications);
 lastId= last._id
} else {
  lastId=""
}
    
//listHeight = this.props.heightforBottomNav ? this.props.heightforBottomNav : '80.6vh'




     const styles = {
        list:{
          height: '80.6vh'
,
          backgroundColor:'white'
        },
      username: {
        color: lightBlue900
        },
      plan: {
        color: grey800,
        fontSize:12
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




	if (this.state.notifications && this.state.notifications.length > 0) {
      var notifications = []
      this.state.notifications.forEach((notification) => {

        let time = ` ${moment(notification.time).calendar()} `


		 notifications.push(
          <div id={notification._id} key={notification._id}>
            <ListItem
                  onTouchTap={()=>this.toogleYellCard(notification.yellId,notification.about)}
                  leftAvatar={<Avatar src={notification.sender.profile.avatar} />}
                  primaryText={
                   <div style={styles.username}>{notification.sender.username + ' '} 
                     <span style={styles.subhead}>{notification.content + ' for ' + notification.yell.plan}</span>
                   </div>
                }
              />
            <Divider  inset={true} />
          </div>
        );

      });
    } else {
          

    	notifications = "no notif"

    }


		return (
  <div className="className">
    <CustomScroll
    onScroll={this.handleScroll.bind(this,lastId)}
      > 
      <List style={styles.list} > 
        {notifications}
      </List> 
    </CustomScroll>
    <Snackbar
      open={this.state.snackbarState}
      message={this.state.snackbarMessage}
      autoHideDuration={4000}
      action="undo"
      onActionTouchTap={ ()=>
        this.undoAction(this.state.snackbarType,this.state.snackbarData)
      }
      onRequestClose={this.closeSb.bind(this)}
    />


    {/* if add drawer here, it will rendered on left column itself */}
  </div>  
		);
	}
}
export default RawYellList;
