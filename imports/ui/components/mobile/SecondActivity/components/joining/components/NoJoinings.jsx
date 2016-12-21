import React, { Component } from 'react';
import FacebookProvider, { Share } from 'react-facebook';



 const NoJoinings = () => (
	<div  style={styles.segment}
		className="ui  center aligned basic segment" > 
 <div style={{marginTop:'-5%'}}>
			<h2 style={styles.headerCont}  className="ui center aligned icon header">
			 <i style={styles.icon} className="announcement icon" />
			  <span style={styles.subhead}> {i18n.__('common.joining.noJoining')}</span>
			</h2>
			<div style={styles.content}>{i18n.__('common.joining.shareIt')}</div>
		</div>
	</div>

						 	 );

 export default NoJoinings


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
