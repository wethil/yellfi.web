import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {dees} from '../../../constants.js'

 const NoYellComment = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'51.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			  <FontIcon  style={dees.icon} className="material-icons">insert_comment</FontIcon> <br />
			  <span style={dees.subhead}> {i18n.__('common.comments.noComment')}</span>
			</h2>
			<div style={dees.content}>{i18n.__('common.comments.makeFirstComm')}</div>
		</div>
	</div>

						 	 );

 export default NoYellComment
