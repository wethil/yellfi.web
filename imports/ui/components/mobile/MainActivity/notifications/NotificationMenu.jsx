import React, { Component } from 'react';
import emitter from '../../emitter.js'



 class NotificationMenu extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	unreceivedNtf:[]
 	  };
 	}

componentDidMount(){
	emitter.addListener('changeBadgeContent',(unreceivedNtf) => {
 		 	this.setState({unreceivedNtf:unreceivedNtf  })
 		 	 
 		  });
}


componentWillMount(){
	if (this.props.activeTab==2) {
			this.receiveNotifications()
		}
}

componentWillReceiveProps(nextProps){
	if (nextProps.activeTab==2) {
			this.receiveNotifications()
		}
}


receiveNotifications(){
			Meteor.call('receiveAll', this.state.unreceivedNtf, error => {
				if (error) {
					console.log(error)
				} else {
					//console.log('okay')
				
				}
		});
}

	render() {
		const {unreceivedNtf} = this.state
		unreceived = unreceivedNtf.length
		
		return (
			<a className="item" >
					    <i className="large world icon"></i>
					     {unreceived>0?<div  className="floating ui mini red circular label"> 
					     					{unreceived} 
					     				 </div>:null}
				</a>
		);
	}
}
export default NotificationMenu;

