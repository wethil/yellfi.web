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
				<div className="ui content">
					  <div className="ui inverted bottom fixed two item menu">
						  <a className="active violet item">Public Plans</a>
						  <a className="active blue item">Create a Plan</a>
					 </div>
				</div>
			</span>	
			
		);
	}
}
export default MainActivity;


  const styles = {
        buttons:{
          bottom: '0%',
          position:'fixed'
        }

    }





 /*
 <div style={styles.buttons} className="ui two buttons">
				        <div className="ui  violet button">Public Plans</div>
				        <div className="ui  blue button">Create a Plan</div>
				    </div>

 */