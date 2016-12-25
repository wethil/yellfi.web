import React from 'react';
import { browserHistory } from 'react-router'


export const PublicityLabel = (props) => {
switch(props.publicity){
	case 0:
		label = i18n.__('common.publicity.alone')
	break;
	case 1:
		label = i18n.__('common.publicity.everyone')
	break;
	case 2:
		label = i18n.__('common.publicity.elected')
	break;	
}


 return	(
  			<span>  <a className="ui mini circular label"><i className="user icon"></i> {label}</a>  </span> 
		);
 }



export  const ParticipationsButton = (props) => {
buttonContent =<button onClick={()=>  browserHistory.push('/yell/'+props.yellId + '?dialog=joining')} 
       				 className=" mini ui button basic violet">{i18n.__('common.YellCard.participation')} {props.jq} </button>	
switch(props.publicity){
	case 0:
		button = null
	break;
	case 1:
		button = buttonContent
	break;
	case 2:
		button = buttonContent
	break;	
}


 return	(
  		<span>{button} </span>
		);
 }


