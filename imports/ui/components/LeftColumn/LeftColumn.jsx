import React, { Component } from 'react';
import LeftNavHead from './LeftNavHead/LeftNavHead.jsx'
import MainFragment from './YellsFragment/MainFragment'


export  default class LeftColumn extends Component {
	
	render() {
		return (
			<div>
				<LeftNavHead />
				<MainFragment userID={Meteor.userId()} />
			</div>
		);
	}
}
