import React, { Component } from 'react';
import Navbar from './Navbar.jsx'
import MainActivity from './MainActivity/MainActivity.jsx'

 class Index extends Component {


	render() {

		return (
				<div>
						<Navbar />
						<MainActivity  />

				</div>
		);
	}
}
export default Index;



