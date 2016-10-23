import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import emitter from '../../emitter.js'

 class NtfLabel extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	badgeContent:0
 	  };
 	}

 	componentDidMount() {
 		 emitter.addListener('changeBadgeContent',(unreceivedNtfCount) => { 
	      this.setState({
	        badgeContent:unreceivedNtfCount
	      })
  	  });
 	}

	render() {
		badgeContent = this.state.badgeContent
		badgeStyle = badgeContent==0 ? {display:'none'} : {}
		return (
			  <Badge badgeStyle={badgeStyle} badgeContent={badgeContent}  secondary={true}>
			      NOTIFICATIONS
			    </Badge>
		);
	}
}
export default NtfLabel;