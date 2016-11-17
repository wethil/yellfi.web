import React from 'react';
import { browserHistory } from 'react-router'


export const PublicityLabel = (props) => {
switch(props.publicity){
	case 0:
		label = "Alone"
	break;
	case 1:
		label = "With Everyone"
	break;
	case 0:
		label = "Elected ones"
	break;	
}


 return	(
  			<span>  <a className="ui mini circular label"><i className="user icon"></i> {label}</a>  </span> 
		);
 }



export  const ParticipationsButton = (props) => {
buttonContent =<button onClick={()=>  browserHistory.push('/yell/'+yell._id + '?dialog=joining')} 
       								  className=" mini ui button teal">PARTICIPATION</button>	
switch(props.publicity){
	case 0:
		button = null
	break;
	case 1:
		button = buttonContent
	break;
	case 0:
		button = buttonContent
	break;	
}


 return	(
  		<span>{button} </span>
		);
 }


