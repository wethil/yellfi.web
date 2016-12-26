import React from 'react';
import FacebookProvider, { Share } from 'react-facebook';
import {fbShareLink,twtrShareLink,twitUname} from '../../../../constants.js'

 const CircleShareButtons = (props) => {
const {plan,custom,publicity,yellId} = props  
langu=i18n.getLocale();
frame = i18n.__('common.twitCont.wannaDo');
secontSent = (publicity) ? i18n.__('common.twitCont.joinMe') :i18n.__('common.twitCont.suggestMe'); 
if(!custom){
	planCont= plan.replace(/ /g, "%20")
	firstSent = (langu=="tr-TR" || langu =="tr") ? `${planCont} ${frame}`:`${frame} ${planCont}.`;

} else {
	firstSent =  i18n.__('common.twitCont.createdPlan');
}

tweet = `${firstSent} ${secontSent}`
url =`https://yellfi.com/y/${yellId}`




 	return (
  	<span>
  		<FacebookProvider appID="1307279049313135">
 		        <Share href={url} >
 		          	<button className="ui circular facebook basic mini blue icon button">
 					  <i className="facebook icon"></i>
 					</button>
 		        </Share>
 	 </FacebookProvider>
 		 <a className="ui circular  twitter basic mini blue icon button" 
 			target="_blank"
 		 	href={`https://twitter.com/intent/tweet?text=${tweet}&url=${url}&via=${twitUname}`} >
 				  <i className="twitter icon"></i>
 		</a>  
 
  	</span>
 )}

export default CircleShareButtons;
