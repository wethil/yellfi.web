 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {dees} from '../../../constants.js'

 const NoYell = () => (
  <div 
    className="ui  center aligned basic segment" 
    style={{height:'71.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
      <h2 className="ui center aligned icon header">
        <FontIcon  style={dees.icon} className="material-icons">pets</FontIcon> <br />
        <span style={dees.subhead}> No Any Yells Yet </span>
      </h2>
      <div style={dees.content}> Go.. create first plan! Be our first!  </div>
    </div>
  </div>

               );

 export default NoYell
