import React, { Component } from 'react';
import LeftNavHead from './LeftNavHead/LeftNavHead.jsx'
import MainFragment from './YellsFragment/MainFragment'


//location inf  earned by MainFragment

export  default class LeftColumn extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	
	  };
	}
	render() {
		return (
			<div>
				<LeftNavHead />
				<MainFragment userID={Meteor.userId()} />
				
				
				

			</div>
		);
	}
}
