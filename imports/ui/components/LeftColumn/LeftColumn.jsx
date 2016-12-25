import React, { Component } from 'react';
import LeftNavHead from './LeftNavHead/LeftNavHead.jsx'
import MainFragment from './YellsFragment/MainFragment'
import Yellfy from '../common/Yellfy.jsx'

export  default class LeftColumn extends Component {
	
	render() {
		return (
			<div>
			<Yellfy />
				<LeftNavHead />
				<MainFragment userID={Meteor.userId()} />
			</div>
		);
	}
}
