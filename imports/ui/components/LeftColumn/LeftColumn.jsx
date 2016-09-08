import React, { Component } from 'react';
import LeftNavHead from './LeftNavHead/LeftNavHead.jsx'
import YellTabs from './YellTabs/YellTabs.jsx'
import YellList from './Yells/YellList.jsx'


export  default class LeftColumn extends Component {
	render() {
		return (
			<div>
				<LeftNavHead />
				<YellTabs />
				<YellList />
			</div>
		);
	}
}
