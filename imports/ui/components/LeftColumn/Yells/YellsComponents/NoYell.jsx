 import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';


 const NoYell = () => (
  <div 
    className="ui  center aligned basic segment" 
    style={{height:'71.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
      <h2 className="ui center aligned icon header">
        <FontIcon  style={styles.icon} className="material-icons">pets</FontIcon> <br />
        <span style={styles.subhead}> No Any Yells Yet </span>
      </h2>
      <div style={styles.content}> Go.. create first plan! Be our first!  </div>
    </div>
  </div>

               );

 export default NoYell


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
