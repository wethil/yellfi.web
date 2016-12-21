import React from 'react';
 import FacebookProvider, { Share } from 'react-facebook';

 const CircleShareButtons = () => (
 	<span>
 		<FacebookProvider appID="1307279049313135">
		        <Share href="https://atmospherejs.com/packages/trending">
		          	<button className="ui circular facebook basic mini blue icon button">
					  <i className="facebook icon"></i>
					</button>
		        </Share>
	 </FacebookProvider>
		 <a className="ui circular  twitter basic mini blue icon button"  href="https://twitter.com/intent/tweet?text=Hello%20world">
				  <i className="twitter icon"></i>
		</a>  

 	</span>
)

export default CircleShareButtons;
