 import React  from 'react';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

 const NoSuggestion = (props) => {

if (props.plan =="7") {
	content = "You can find all of public plans on map!"
} else {
	content = "You can look for others suggestion ! "
}

 return	(
 <Paper style={{boxShadow:'none'}} zDepth={1} >
	<Divider />
	<div 
		className="ui  center aligned basic segment " 
		style={{marginRight:0,backgroundColor:'#ffffff'}}> 
		<div style={{marginTop:'-7%'}}>
			<h2 className="ui center aligned icon header">
			<FontIcon  style={styles.icon} className="material-icons">face</FontIcon> <br />
			<span style={styles.subhead}> Sorry, No suggesitons </span>
			</h2>
		<div style={styles.content}>{content} </div>
		</div>
	</div>
</Paper>

						 	 );
 }

 export default NoSuggestion


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
	