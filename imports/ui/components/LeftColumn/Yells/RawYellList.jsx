import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import CustomScroll from 'react-custom-scroll';



 class RawYellList extends Component {
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

    }




	if (this.props.yells && this.props.yells.length > 0) {
      var yells = []
      this.props.yells.forEach((yell) => {

        let time = ` ${moment(yell.date).calendar()} `




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
  ExtraFields = ""
} else {
  ExtraFields = <span style={styles.timeDate}> -- 
                        <a className="ui mini circular label"><i className="users icon"></i> {publicity}</a>
                          <a className="ui mini circular label"><i className="wait icon"></i> {time}</a> 
                      </span>       
}


		 yells.push(
          <div key={yell._id}>
            <ListItem
                  onTouchTap={()=>console.log('click yell')}
                  leftAvatar={<Avatar src={yell.owner.profile.avatar} />}
                  primaryText={ <div style={styles.username}>{yell.owner.username}</div>}
                  secondaryText={
                      	<p>   
                        <span style={styles.plan}>{yell.plan}</span> 
                          {ExtraFields}          
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
       yells = "No yell"
    }


		return (
     <CustomScroll> 
			<List style={styles.list} >	
				{yells}
			</List>	
     </CustomScroll> 
		);
	}
}
export default RawYellList;

