import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import emitter from '../../emitter.js'
 
 class Login extends Component {

 	handleManualLogin(){
 		username = document.getElementById('username').value
 		password = document.getElementById('password').value
 				Meteor.loginWithPassword(username, password, function(error){
				    if(error){
				    	console.log(error)
				    } else {
				    	 emitter.emit('userLogin')
				    }
				}); 

 	}

		handleLogin(){
 	

	

	Meteor.loginWithFacebook({
		requestPermissions: ['public_profile', 'email']
	}, function(err){
		if (err) {
			throw new Meteor.Error("Facebook login failed");
		} else {
			 emitter.emit('userLogin')
		}
	});
		}
	render() {

		return (
			
				<div >
						 
				<input type="text" id="username"  placeholder="username" />
				<input type="text" id="password"  placeholder="password" />
				<button onClick={this.handleManualLogin.bind(this)} className="ui button">Login</button>
						
					<button onClick={this.handleLogin.bind(this)} className="ui button"> Facebook Login</button>
				</div>	
			 
		);
	}
}
export default Login;


