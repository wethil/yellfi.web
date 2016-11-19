import React  from 'react';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

 const NoYellOnCard = (props) => {


 return	(
 <Paper style={{boxShadow:'none'}} zDepth={1} >
	<Divider />
	<div 
		className="ui  center aligned basic segment " 
		style={{marginRight:0,backgroundColor:'#ffffff'}}> 
		<div style={{marginTop:'7%'}}>
			<h2 className="ui center aligned icon header">
			<FontIcon  style={styles.icon} className="material-icons">pets</FontIcon> <br />
			<span style={styles.subhead}>  {i18n.__('common.YellCard.noYellOnCard')}</span>
			</h2>
		<div style={styles.content}> {i18n.__('common.YellCard.bannedDeleted')} </div>
		</div>
	</div>
</Paper>

						 	 );
 }

 export default NoYellOnCard


 const styles = {
      icon: {
        fontSize: 60,
        color:'#2196f3'
        },
        subhead:{
        	color:'#616161',
        	fontSize:21
        },
       content:{
       	color:'#424242',
       	fontSize:14,
       	fontFamily:'Lato, Helvetica Neue, Arial, Helvetica, sans-serif'
       }
    }
	