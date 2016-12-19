import React from 'react';
 
 const NoAnyYell = () => (
<div  className="ui  center aligned basic segment" style={{marginRight:0,backgroundColor:'#ffffff'}}> 
         <div style={{marginTop:'12%'}}>
              <h2 className="ui center aligned icon header">
               <i style={styles.icon} className="meh icon" />
                <span style={styles.subhead}> {i18n.__('common.YellCard.noYellOnCard')}</span>
              </h2>
              <div style={styles.content}>{i18n.__('common.YellCard.bannedDeleted')}</div>
           </div>
      </div>
)

export default NoAnyYell;

const styles = {
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
