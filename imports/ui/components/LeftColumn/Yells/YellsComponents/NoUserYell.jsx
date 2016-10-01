 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoUserYell = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'71.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">event</FontIcon> <br />
			  <span style={styles.subhead}> No Plan Yet </span>
			</h2>
			<div style={styles.content}> Click + button, choose from the list and get suggesitons!  </div>
		</div>
	</div>

						 	 );

 export default NoUserYell


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
