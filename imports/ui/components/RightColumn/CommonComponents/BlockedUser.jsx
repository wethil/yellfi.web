import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {dees} from '../../constants.js'


 const BlockedUser = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'54.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={dees.icon} className="material-icons">face</FontIcon> <br />
			  <span style={dees.subhead}>{i18n.__('common.comments.sorryBlockedUser')}</span>
			</h2>
			<div style={dees.content}>{i18n.__('common.comments.blockedUser')}</div>
		</div>
	</div>

						 	 );

 export default BlockedUser

