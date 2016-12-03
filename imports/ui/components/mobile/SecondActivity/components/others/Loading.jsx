import React, { Component } from 'react';
 
 const Loading = () => (
  <div  className="ui  center aligned basic segment" style={styles.segment}> 
    <div style={{marginTop:'33%'}} className="ui active inverted dimmer">
     <div className="ui active centered inline huge loader"></div>
    </div> 
  </div>
)

export default Loading;

 const styles = {
        segment:{
          marginRight:0,
          backgroundColor:'#ffffff'
        }
    }