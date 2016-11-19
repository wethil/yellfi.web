 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import i18n from 'meteor/universe:i18n';

 const NoUserYell = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'71.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={styles.icon} className="material-icons">event</FontIcon> <br />
			  <span style={styles.subhead}>{ i18n.__('common.noUserYell.noPlan')} </span>
			</h2>
			<div style={styles.content}> { i18n.__('common.noUserYell.clickButt')} </div>
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
