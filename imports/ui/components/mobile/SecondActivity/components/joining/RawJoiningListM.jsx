import React, { Component } from 'react';
import NoJoinings from './components/NoJoinings.jsx'
import emitter from '../../../emitter.js'

 class RawJoiningListM extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	yell:{}
 	  };
 	}

 	componentWillMount(){
 		const {yell,requerers}=this.props
 		ownership = Meteor.userId() && Meteor.userId() == yell.ownerId ? true : false 
 		emitter.emit('changeYell',yell,ownership)//second Activity
 		emitter.emit('changeDialogAction','joining') //second Activity
 		this.setState({yell:yell, requerers:requerers })
 		
 	}

 	componentWillReceiveProps (nextProps) {
 		const {yell,requerers}=nextProps
 		this.setState({requerers:requerers })
 	}


	render() {

		const {requerers} = this.state
		

		requererList = []
		requerersa = [1,2,3,4,5,5,6,4,3,31,424,412]
		if (requerersa && requerersa.length>0) {
				requerersa.forEach((requerer) => { //src={requerer.picture}
					requererList.push(
						 <div className="ui centered fluid  card" >
						    <div className="content"> 
						      <img  style={styles.avatar} className="left floated mini ui circular  image" src="#" />
						      <div style={styles.header} className="header">
						     	firstname
						      </div>
						    </div>
						    <div className="extra content">
						       	<button className="fluid ui toggle button"> Approve </button>
						    </div>
						  </div>	 	
						)
				});
		} else {
			requererList=<NoJoinings />
		}

		return (
			<div className="ui container "> 
				{requererList}

			<span style={styles.mainButton} >	<button className="fluid ui toggle button">Join</button> </span>
				 </div>
		);
	}
}
export default RawJoiningListM;

const styles= {
	header:{
		marginLeft: '2.4em',
		color:'#4183c4'

	},
	meta:{
		marginLeft: '3.9em',
		fontSize:'0.8em'
	},

	avatar:{
		paddingBottom: '0em !important'
	},
	mainButton:{
		position:'fixed',
	    zIndex: 9999,
		top: '89%',
	    width: '92%'
	}
}




