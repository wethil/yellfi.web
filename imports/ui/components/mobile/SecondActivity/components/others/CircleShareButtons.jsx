import React from 'react';
 import FacebookProvider, { Share } from 'react-facebook';
 import {fbShareLink,twtrShareLink} from '../../../../constants.js'

 const CircleShareButtons = () => (
 	<span>
 		<FacebookProvider appID="1307279049313135">
		        <Share href={fbShareLink} >
		          	<button className="ui circular facebook basic mini blue icon button">
					  <i className="facebook icon"></i>
					</button>
		        </Share>
	 </FacebookProvider>
		 <a className="ui circular  twitter basic mini blue icon button"  href={twtrShareLink} >
				  <i className="twitter icon"></i>
		</a>  

 	</span>
)

export default CircleShareButtons;
