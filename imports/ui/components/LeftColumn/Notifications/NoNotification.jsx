import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import i18n from 'meteor/universe:i18n';
import {dees} from '../../constants.js'
 const NoNotification = () => (
  <div 
    className="ui  center aligned basic segment" 
    style={{height:'71.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
      <h2 className="ui center aligned icon header">
        <FontIcon  style={dees.icon} className="material-icons">feedback</FontIcon> <br />
        <span style={dees.subhead}>{i18n.__('common.noNotif.noAct')}  </span>
      </h2>
      <div style={dees.content}>{i18n.__('common.noNotif.willNotif')}</div>
    </div>
  </div>
);

 export default NoNotification





