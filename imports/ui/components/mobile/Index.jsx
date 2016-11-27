import React, { Component } from 'react';
import Navbar from './Navbar.jsx'
import LatestPlans from './MainActivity/yells/LatestPlans.jsx'

 class Index extends Component {


	render() {

		return (
				<div>
						<Navbar />
						<LatestPlans />

				</div>
		);
	}
}
export default Index;



