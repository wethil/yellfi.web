 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoYellComment = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'51.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">insert_comment</FontIcon> <br />
			  <span style={styles.subhead}> {i18n.__('common.comments.noComment')}</span>
			</h2>
			<div style={styles.content}>{i18n.__('common.comments.makeFirstComm')}</div>
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
