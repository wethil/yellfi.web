 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoParticipants = (props) => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'45.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">group_add</FontIcon> <br />
			  <span style={styles.subhead}>{i18n.__('common.joining.noJoining')} </span>
			</h2>
			{props.ownership ? 
				<div style={styles.content}>{i18n.__('common.joining.shareIt')}</div>
				:
				<div style={styles.content}>{i18n.__('common.joining.joinFirst')}</div>}
			
		</div>
	</div>

						 	 );

 export default NoParticipants


 const styles = {
      icon: {
        fontSize: 129,
        color:'#2196f3'
        },
        subhead:{
        	color:'#616161'
        },
       content:{
       	color:'#424242'
       }
    }
