import React, { Component } from 'react';
import  {frameStyle} from '../yells/YellsComponents/constant.js'

 class LogInPage extends Component {
	render() {
		return (
			<div className="ui container" id="container" style={frameStyle}>
				<div className="ui center aligned padded grid">	
				<div>
							<h1 style={styles.header} > yellfi </h1>
					<h5 style={styles.subHeader} > Get suggestions, get people. </h5>
					
				</div>
					<div className="ui center aligned basic segment">
						<button className="ui fluid facebook button">
							<i className="facebook icon"></i>
							Sign in with Facebook
						</button>
						  <div className="ui horizontal divider">
							    Or
							</div>
					   <button className="ui fluid primary button">
							<i className="unhide icon"></i>
							Take a Look
						</button>
					 
					</div>	
				</div>
			</div>
		);
	}
}
export default LogInPage;

const styles={
	header:{
	fontSize:'6em',
    color:'#3F51B5',
    fontFamily: "'McLaren', cursive",
    marginTop:'1em'
	},
	subHeader:{
		marginTop: '0.1em',
	    color: '#9E9E9E'
	}
}

