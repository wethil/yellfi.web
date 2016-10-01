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

 	registerUser(e){
 		e.preventDefault()
 		uname = $('#uname').val()
 		email = $('#email').val()
 		pass = $('#pass').val()
 		console.log('login')
 		console.log(uname + '' + '' + email + '' + pass)
 		
 		Accounts.createUser(
            {
                username: uname,
                password: pass,
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
            		 document.getElementById('uname').value = ""
			 		 document.getElementById('email').value = ""
			 		 document.getElementById('pass').value =""
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
												id="uname" style={{height: 37}} hintText="Username"/>} />
							<ListItem
								disabled={true}
								children ={<TextField  id="email" style={{height: 37}} hintText="Email"/>} />
							<ListItem
								disabled={true}
								children ={<TextField  id="pass" style={{height: 37}} hintText="Password"/>} />
							
						</List>
						<button className="ui button" onClick={(e)=>this.registerUser(e)} > Register   </button>
					</div>
		);
	}
}
export default Register;