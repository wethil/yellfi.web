import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import CustomScroll from 'react-custom-scroll';
import NoUserYell from './YellsComponents/NoUserYell.jsx'
import NoApprovedYell from './YellsComponents/NoApprovedYell.jsx'

import { Session } from 'meteor/session'
import emitter from '../../emitter.js'


 class RawYellList extends Component {



toogleYellCard(yell) {
  console.log('toogle yell card')
 emitter.emit('toogleDrawerForCard',yell) //make left drawer yell card state
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




	if (this.props.yells && this.props.yells.length > 0) {
      var yells = []
      this.props.yells.forEach((yell) => {

        let time = ` ${moment(yell.time).calendar()} `




        switch(yell.publicity) {
        case 0 : 
           publicity = "Alone"
		    case 1:
		        publicity = "With Everyone"
		        break;
		    case 2:
		        publicity = "Elected ones"
		        break;		   
		}
    
if (yell.publicity == 0) {
  publicityLabel = ""
  timeLabel =""
} else {
  publicityLabel= <span>  <a className="ui mini circular label"><i className="users icon"></i> {publicity}</a>  </span>  
  timeLabel = <span style={styles.timeDate}> -- <a className="ui mini circular label"><i className="wait icon"></i> {time}</a> </span>
                        
   
                          
                         
}


		 yells.push(
          <div key={yell._id}>
            <ListItem
                  onTouchTap={()=>this.toogleYellCard(yell)}
                  leftAvatar={<Avatar src={yell.owner.profile.avatar} />}
                  primaryText={ <div style={styles.username}>{yell.owner.username} <span style={styles.subhead}> planned </span> {publicityLabel} </div>}
                  secondaryText={
                      	<p>   
                        <span style={styles.plan}>{yell.plan}</span> 
                          {timeLabel}          
                         <br />
                        <span style={styles.keywords}> {yell.keyword} </span>
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
        yells = <NoUserYell />
        break;
    case 1:
        yells = "no yell"
        break;
      case 2:
        yells = <NoApprovedYell />
        break;
    default:
         yells="error"
}

    }


		return (
  <div className="className">
       <CustomScroll> 
      <List style={styles.list} > 
        {yells}
      </List> 
     </CustomScroll>
     

{/* if add drawer here, it will rendered on left column itself */}
  </div>  
		);
	}
}
export default RawYellList;

