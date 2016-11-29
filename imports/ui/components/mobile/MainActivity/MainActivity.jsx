import React, { Component } from 'react';
import LatestPlans from './yells/LatestPlans.jsx'
import Login from '../../LeftColumn/Accounts/Login.jsx'
import emitter from '../../emitter.js'

 class MainActivity extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	userId:Meteor.userId()
 	  }
 	}

 	componentDidMount(){
 		emitter.addListener('userLogin',()=> this.setState({userId:Meteor.userId()}) );
 	}
	render() {
		return (
			<span >
				{this.state.userId==null ? <div style={{marginTop:'50%'}} >  <Login /> </div> : <LatestPlans />} 
			</span>	
			
		);
	}
}
export default MainActivity;