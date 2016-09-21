import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Login from '../Accounts/Login.jsx'
import Register from '../Accounts/Register.jsx'
import LatestYells from '../Yells/Anon/LatestYells.jsx'
import NearestYells from '../Yells/Anon/NearestYells.jsx'

 class AnonFragment extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	activeTab:0
 	  };
 	}

 		changeTab(value){
		this.setState({activeTab:e.target.value})
	}


	render() {
		console.log(this.state.activeTab)
		return (
			 <div className="heads">
		        
		          <Tabs value={this.state.activeTab}
		          		onChange={(e)=>this.changeTab.bind(this,e)}
		          		>
		            <Tab style={tab_style}
		            	 value={0}		  
		                 label="LOGIN">

		                <Login /> 
		                <Register />
		            
		            </Tab>

		            <Tab style={tab_style}
		            	 value={1}	
		                  label="LATEST"> 

		                 <LatestYells />
		            </Tab>


		            <Tab style={tab_style}
		            	 value={2}	
		                 label="NEAREST"> 

		              	<NearestYells />
		                 
		            </Tab>
		          </Tabs>
		      </div>
		);
	}
}
export default AnonFragment;

const tab_style = {
       //backgroundColor: '#3f51b5'
      };
