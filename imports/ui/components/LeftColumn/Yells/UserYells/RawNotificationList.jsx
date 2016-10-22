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
import emitter from '../../../emitter.js'
import Snackbar from 'material-ui/Snackbar';


 class RawYellList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:""
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



toogleYellCard(yellId) {
  browserHistory.push('/yell/'+yellId)
// emitter.emit('toogleDrawerForCard',yellId) //make left drawer yell card state
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

	render() {



    
listHeight = this.props.heightforBottomNav ? this.props.heightforBottomNav : '80.6vh'




     const styles = {
        list:{
          height: listHeight,
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




	if (this.props.notifications && this.props.notifications.length > 0) {
      var notifications = []
      this.props.notifications.forEach((notification) => {

        let time = ` ${moment(notification.time).calendar()} `


		 notifications.push(
          <div key={notification._id}>
            <ListItem
                  onTouchTap={()=>this.toogleYellCard(notification._id)}
                  leftAvatar={<Avatar src={notification.sender.profile.avatar} />}
                  primaryText={ <div style={styles.username}>{notification.sender.username} </div>}
                  secondaryText={
                      	<p>   
                        <span style={styles.plan}>{notification.content}</span>
                  		</p>
                  }
                  secondaryTextLines={1}
              />
            <Divider  inset={true} />
          </div>
        );

      });
    } else {
          

    	yells = "no notif"

    }


		return (
  <div className="className">
    <CustomScroll> 
      <List style={styles.list} > 
        {yells}
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

