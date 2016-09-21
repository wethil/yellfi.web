import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import emitter from '../../emitter.js'

 class Register extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	username:""
 	  };
 	}

 	registerUser(){

 		username = document.getElementById('username').value
 		email = document.getElementById('email').value
 		password = document.getElementById('password').value
 		console.log(` ${username} ${email} ${password} `)
 		
 		Accounts.createUser(
            {
                username: username,
                password: password,
                profile: {
                    firstName: 'Fatih',
                    lastName: 'Dogru',
                    avatar : 'http://semantic-ui.com/images/avatar/large/stevie.jpg',
                    paws : []
                    

                },
                email: email
            
            },function(res,error){
            	if (error) {
            		console.log(error)
            	} else {
            		 document.getElementById('username').value = ""
			 		 document.getElementById('email').value = ""
			 		 document.getElementById('password').value =""
			 		 emitter.emit('userLogin')
            	}
            }
        );
 	}
	render() {
		return (
			
					<div className="className"><List>
						 <Subheader>Register</Subheader>
							<ListItem
								disabled={true}
								children ={<TextField   
												id="username" style={{height: 37}} hintText="Username"/>} />
							<ListItem
								disabled={true}
								children ={<TextField  id="email" style={{height: 37}} hintText="Email"/>} />
							<ListItem
								disabled={true}
								children ={<TextField  id="password" style={{height: 37}} hintText="Password"/>} />
							
						</List>
						<button className="ui button" onClick={this.registerUser.bind(this)} > Register   </button>
					</div>
		);
	}
}
export default Register;