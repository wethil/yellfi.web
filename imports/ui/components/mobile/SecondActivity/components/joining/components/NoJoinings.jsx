import React, { Component } from 'react';
import FacebookProvider, { Share } from 'react-facebook';



 const NoJoinings = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{marginRight:0,backgroundColor:'#ffffff'}}> 
 <div style={{marginTop:'12%'}}>
			<h2 className="ui center aligned icon header">
			 <i style={styles.icon} className="announcement icon" />
			  <span style={styles.subhead}> {i18n.__('common.joining.noJoining')}</span>
			</h2>
			<div style={styles.content}>{i18n.__('common.joining.shareIt')}</div>
		</div>
   <div style={{marginTop:'19%'}} >
    <FacebookProvider appID="1307279049313135">
              <Share href="https://atmospherejs.com/packages/trending">
             <button className="ui  facebook button">
                <i className="facebook icon"></i>
                Share
            </button>
              </Share>
     </FacebookProvider>
       <a className="ui  twitter button"  href="https://twitter.com/intent/tweet?text=Hello%20world">
            <i className="twitter icon"></i>
            Share
      </a>      
    </div>
	</div>

						 	 );

 export default NoJoinings


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
