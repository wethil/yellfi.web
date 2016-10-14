 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoParticipants = (props) => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'45.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">group_add</FontIcon> <br />
			  <span style={styles.subhead}> No Joining Yet </span>
			</h2>
			{props.ownership ? 
				<div style={styles.content}> Share this plan with your friends on social media or send them link! </div>
				:
				<div style={styles.content}> You join first! </div>}
			
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
