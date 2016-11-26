import React, { Component } from 'react';

 class Navbar extends Component {
	render() {
		return (
			<div className="ui fixed icon menu">
			  <a className="item">
			    <i className="gamepad icon"></i>
			  </a>
			  <a className="item">
			    <i className="video camera icon"></i>
			  </a>
			  <a className="item">
			    <i className="video play icon"></i>
			  </a>
			</div>
		);
	}
}
export default Navbar;