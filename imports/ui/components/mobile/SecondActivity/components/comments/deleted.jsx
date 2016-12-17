import React, { Component } from 'react';
import emitter from '../../../emitter.js';

 class CommentInput extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	yellId:"",
 	  	ownerId:""
 	  };
 	}

 	componentDidMount(){
	emitter.addListener('getIDs',(ownerId,yellId) => {
 		 	this.getIDs(ownerId,yellId)
 		  });
 	}

 	getIDs(ownerId,yellId){
 		this.setState({
 			ownerId:ownerId,
 			yellId:yellId
 		})
 		console.log(ownerId)
 		console.log(yellId)
 	}

 	inputSubmit(e){
	e.preventDefault()
	if (e.key == 'Enter') {
		let comCont = $('#commentInput').val()
		let yellId = this.state.yellId
 		let yellOwnerId = this.state.ownerId

 
		Meteor.call('addComment',comCont,yellId,yellOwnerId,error=>{
			if (error) {
				console.log(error)
			} else {
				$('#commentInput').val("")
				 document.getElementById("commentInput").blur()
				
			}
		});	
		console.log(comCont + yellId + ' ' + yellOwnerId )

	}
}

changeCommentInput(e){
		e.preventDefault()
	 	this.setState({commentText:e.target.value})
	 	console.log(e.target.value) 
}


	render() {
		return (
			<div className="ui fluid left icon input">
				 <input type="text"
			  		 id="commentInput"   
			  		 onKeyUp={this.inputSubmit.bind(this)}
			  		 placeholder={i18n.__('common.comments.writeSugg')} /> 
		  		  <i className="user icon"></i>
			</div> 
		);
	}
}
export default CommentInput;