 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoNotification = () => (
  <div 
    className="ui  center aligned basic segment" 
    style={{height:'71.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
      <h2 className="ui center aligned icon header">
        <FontIcon  style={styles.icon} className="material-icons">feedback</FontIcon> <br />
        <span style={styles.subhead}> No Any Actions Yet </span>
      </h2>
      <div style={styles.content}> You will be notified when a action has occured ,keep suggesting and joining!  </div>
    </div>
  </div>

               );

 export default NoNotification


 const styles = {
      icon: {
        fontSize: 12,
        color:'#2196f3'
        },
        subhead:{
          color:'#616161'
        },
       content:{
        color:'#424242'
       }
    }


