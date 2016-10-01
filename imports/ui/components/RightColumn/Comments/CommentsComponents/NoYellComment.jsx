 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoYellComment = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'54.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">insert_comment</FontIcon> <br />
			  <span style={styles.subhead}> No Suggestion Yet </span>
			</h2>
			<div style={styles.content}> Make first suggestion for this plan!  </div>
		</div>
	</div>

						 	 );

 export default NoYellComment


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
