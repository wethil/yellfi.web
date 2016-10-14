 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const BlockedUser = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'54.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">face</FontIcon> <br />
			  <span style={styles.subhead}> Sorry, but... </span>
			</h2>
			<div style={styles.content}>  It seems yor suggestions are blocked for this plan. Time to try for others </div>
		</div>
	</div>

						 	 );

 export default BlockedUser


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