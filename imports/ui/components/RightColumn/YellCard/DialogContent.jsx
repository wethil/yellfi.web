import React, { Component } from 'react';

 class DialogContent extends Component {
 		
 	
	render() {

	switch(this.props.a) {
		    case 1:
		       dialogContent="comment"  
		        break;
		    case 2:
		   dialogContent ="joining"
		        break;
		    default:
		    dialogContent =   "please do not play with url.."
		}


		return (
			{dialogContent}
		);
	}
}
export default DialogContent;