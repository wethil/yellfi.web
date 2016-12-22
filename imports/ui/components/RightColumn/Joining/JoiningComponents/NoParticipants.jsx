 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {dees} from '../../../constants.js'


 const NoParticipants = (props) => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'45.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={dees.icon} className="material-icons">group_add</FontIcon> <br />
			  <span style={dees.subhead}>{i18n.__('common.joining.noJoining')} </span>
			</h2>
			{props.ownership ? 
				<div style={dees.content}>{i18n.__('common.joining.shareIt')}</div>
				:
				<div style={dees.content}>{i18n.__('common.joining.joinFirst')}</div>}
			
		</div>
	</div>

						 	 );

 export default NoParticipants
