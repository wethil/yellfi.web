 import React, { Component } from 'react';



 const NoComment = () => (
  <div className="ui  center aligned basic segment" style={styles.segment}> 
    <div style={{marginTop:'-9%'}}>
      <h2 style={styles.headerCont} className="ui center aligned icon header">
        <i style={styles.icon} className="comments outline icon" />
        <span style={styles.subhead}> {i18n.__('common.comments.noComment')}</span>
      </h2>
      <div style={styles.content}>{i18n.__('common.comments.makeFirstComm')}</div>
    </div>
  </div>
  );

 export default NoComment


 const styles = {
        segment:{
          marginRight:0,
          backgroundColor:'#ffffff'
        },
        headerCont:{
           marginBottom:0,
         },
        icon: {
          fontSize: 60,
          color:'#2196f3',
          height:'1% !important',
          marginBottom:1
        },
        subhead:{
          color:'#616161',
          fontSize:'0.8em'
        },
        content:{
          color:'#424242'
        }
    }




   



/*


*/