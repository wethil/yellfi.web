import React, { Component } from 'react';
import LatestPlans from '../../Yells/LatestPlans.jsx';
import emitter from '../../../emitter.js';

 class MainPlansFeed extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	limit:10
 	  };
 	}

 componentDidMount(){
     emitter.addListener('incLimit', ()=> { 
        this.setState({limit:this.state.limit+5})
    });


     emitter.addListener('resetMPLimit',()=> {
		 this.setState({limit:10});
	 }); 

  }

	render() {

		const {limit} = this.state
		const {activeTab} =this.props

		content = (activeTab == 0 )? <LatestPlans limit={limit} /> : null
		return (
			<div>	
				 {content}
			</div> 
		);
	}
}
export default MainPlansFeed;
