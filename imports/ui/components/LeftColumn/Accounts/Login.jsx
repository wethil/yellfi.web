import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import emitter from '../../emitter.js'
 
 class Login extends Component {

		handleLogin(){
 		username = document.getElementById('username').value
 		password = document.getElementById('password').value

		/*	Meteor.loginWithPassword(username, password, function(error){
				    if(error){
				    	console.log(error)
				    } else {
				    	 emitter.emit('userLogin')
				    }
				}); */

	Meteor.loginWithFacebook({}, function(err){
		if (err) {
			throw new Meteor.Error("Facebook login failed");
		} else {
			 emitter.emit('userLogin')
		}
	});
		}
	render() {

		return (
			
				<div className="className">
						 <List>
					 <Subheader>Login</Subheader>
						<ListItem
							disabled={true}
							children ={<TextField id="username"  style={{height: 37}} hintText="Username"/>} />
						<ListItem
							disabled={true}
							children ={<TextField  id="password" style={{height: 37}} hintText="Password"/>} />
						
					</List>
					<button onClick={this.handleLogin.bind(this)} className="ui button">Login</button>
				</div>	
			 
		);
	}
}
export default Login;


