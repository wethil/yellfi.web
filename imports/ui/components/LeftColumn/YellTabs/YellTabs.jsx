/*
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserYells from '../Yells/UserYells.jsx'
import OthersYells from '../Yells/OthersYells.jsx'
import ApprovedYells from '../Yells/ApprovedYells.jsx'
import emitter from '../../emitter.js'
export default class YellTabs extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	activeTab:0,
	  	user:0
	  };
	}

	
	changeTab(value){
		this.setState({activeTab:value})
		if (this.state.activeTab==1){
			console.log('toogletab')
			
		}
	}
	render() {
	const tab_style = {
       //backgroundColor: '#3f51b5'
      };

     
	
		return (
			 <div className="heads">
		        
		          <Tabs value={this.state.activeTab}
		          		onChange={this.changeTab.bind(this)}
		          		>
		            <Tab style={tab_style}
		            	 value={0}		  
		                 label="MY PLANS">

		                 {this.state.user!=0 ? 
		                 	<div className="className">
			                 	<UserYells /> 
			                 	<button 
			                 		className="ui button"
			                 		onClick={()=>this.setState({user:0})}>
			                 		logout
			                 		</button>
		                 	</div>
		                 	: <button 
		                 		className="ui button"
		                 		onClick={()=>this.setState({user:1})}>
		                 		login
		                 		</button>  
		                 	}
		            
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



*/
