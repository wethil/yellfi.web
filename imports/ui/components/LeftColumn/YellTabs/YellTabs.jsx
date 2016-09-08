import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class YellTabs extends Component {
	render() {
	const tab_style = {
       backgroundColor: '#3f51b5'
      };
	
		return (
			 <div className="heads">
		        
		          <Tabs>
		            <Tab  style={tab_style}
		                  //onActive={this.activeRecents}
		                  label="MY PLANS"
		                  />
		            <Tab  style={tab_style}
		                  //onActive={this.activeNearby}
		                  label="OTHERS"
		                  />
		            <Tab style={tab_style}
		                 label="APPROVED"
		                   //lonActive={this.activeApproved}
		                  />
		          </Tabs>
		      </div>
		);
	}
}

