import React, { Component } from 'react';
import LeftNavHeadComposer from './LeftNavHead/LeftNavHeadComposer.jsx'
import MainFragment from './YellsFragment/MainFragment'


//location inf  earned by MainFragment

export  default class LeftColumn extends Component {
	
	render() {
		return (
			<div>
				<LeftNavHeadComposer />
				<MainFragment userID={Meteor.userId()} />
				
				
				

			</div>
		);
	}
}
