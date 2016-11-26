import React, { Component } from 'react';
import Navbar from './Navbar.jsx'

 class Index extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	plans : 5
 	  };
 	}


 	componentDidMount(){
 		$('.ui.container')
				  .visibility({
				    once: false,
				    // update size when new content loads
				    observeChanges: true,
				    // load content on bottom edge visible
				    onBottomVisible: ()=> {
				      // loads a max of 5 times
				      this.setState({plans:plans+5})
				    }
				  })
				;
 	}


 	openModal(){
 			$('.long.modal').modal('show');
 	}

	render() {
plans = this.state.plans
	planList = []
		for (var i = 0; i < plans; i++) {
			planList.push(  <div className=" ui centered fluid card">
				    <div className="content">
				      <img className="right floated mini ui circular image" src="http://semantic-ui.com/images/avatar/small/matt.jpg"/>
				      <div className="header">
				        Elliot Fu
				      </div>
				      <div className="meta">
				        Friends of Veronika
				      </div>
				      <div className="description">
				        Elliot requested permission to view your contact details
				      </div>
				    </div>
				    <div className="extra content">
				      <div className="ui two buttons">
				        <div onClick={this.openModal.bind(this)} className="ui basic green button">Approve</div>
				        <div className="ui basic red button">Decline</div>
				      </div>
				    </div>
				  </div>)
		}


		return (
			<div className="className">
				<Navbar />
				<div className="ui container" style={{marginTop:60}}>
				{planList}
				</div>




<div className="ui long modal">
  <i className="close icon"></i>
  <div className="header">
    Modal Title
  </div>
  <div className="image content">
    <div className="image">
      An image can appear on left or an icon
    </div>
    <div className="description">
      A description can appear on the right
    </div>
  </div>
  <div className="actions">
    <div className="ui button">Cancel</div>
    <div className="ui button">OK</div>
  </div>
</div>



			</div>	
		);
	}
}
export default Index;



