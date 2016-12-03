import React, { Component } from 'react';



 const NoNotification = () => (
  <div className="ui  center aligned basic segment" style={styles.segment}> 
    <div style={{marginTop:'12%'}}>
      <h2 className="ui center aligned icon header">
        <i style={styles.icon} className="warning circle icon" />
        <span style={styles.subhead}> {i18n.__('common.noNotif.noAct')}</span>
      </h2>
      <div style={styles.content}>{i18n.__('common.noNotif.willNotif')}</div>
    </div>
  </div>
  );

 export default NoNotification


 const styles = {
        segment:{
          marginRight:0,
          backgroundColor:'#ffffff'
        },
        icon: {
          fontSize: 129,
          color:'#2196f3',
          height:'1% !important'
        },
        subhead:{
          color:'#616161'
        },
        content:{
          color:'#424242'
        }
    }




   



/*


*/