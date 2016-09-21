import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserYells from '../Yells/UserYells.jsx'
import OthersYells from '../Yells/OthersYells.jsx'
import ApprovedYells from '../Yells/ApprovedYells.jsx'
import emitter from '../../emitter.js'

 class UserFragment extends Component {
 	constructor(props) {
	  super(props);
	
	  this.state = {
	  	activeTab:0,
	  	user:0
	  };
	}

	changeTab(value){
		this.setState({activeTab:value})
	}

	handleLogout(e) {
		e.preventDefault()
		Meteor.logout();
		emitter.emit('userLogout')
		console.log('click logout')
	}

	render() {
		return (
			 <div className="heads">
		        
		          <Tabs value={this.state.activeTab}
		          		onChange={this.changeTab.bind(this)}
		          		>
		            <Tab style={tab_style}
		            	 value={0}		  
		                 label="MY PLANS">
								 <button 
		                 		className="ui button"
		                 		onClick={(e)=>{this.handleLogout(e)}}>
		                 		logout
		                 		</button>  
		                 	
		            
		            </Tab>

		            <Tab style={tab_style}
		            	 value={1}	
		                  label="OTHERS"> 

		                  <OthersYells />

		            </Tab>


		            <Tab style={tab_style}
		            	 value={2}	
		                 label="APPROVED"> 

		              	 <ApprovedYells/>
		                 
		            </Tab>
		          </Tabs>
		      </div>
		);
	}
}
export default UserFragment;

const tab_style = {
       //backgroundColor: '#3f51b5'
      };
