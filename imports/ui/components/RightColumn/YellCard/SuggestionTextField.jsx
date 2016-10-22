import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

 class SuggestionTextField extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	comment:""
 	  };
 	}

 	changeCommentText(e) {
	 	e.preventDefault()
	 	this.setState({comment:e.target.value})
	 	console.log(e.target.value) 
 	}

 	handlePress(keycode){
 		if (keycode=='Enter') {
  			this.makeSuggestion()
 		}
 	}
 	

 	makeSuggestion()
 	{
 		let comCont = this.state.comment
 		let yellId = this.props.yellId
 		let yellOwnerId = this.props.yellOwnerId
 		let ownerId = Meteor.userId();
 
		Meteor.call('addComment',comCont,yellId,yellOwnerId,ownerId,error=>{
			if (error) {
				console.log(error)
			} else {
				this.setState({comment:""})
				
			}
		});	
 	}

	render() {
		return (
			 <TextField
				      className="suggestInput"
				      multiLine={true}
				      rows={1}
				      rowsMax={2}
				      onKeyDown={(keycode)=>this.handlePress(keycode.key)}
				      onChange={(e)=>this.changeCommentText(e)}
				      value={this.state.comment}
				      id="suggestionInput"
				      style={styles.commentInput}
				      textareaStyle={styles.textareaStyle}
				    />
		);
	}
}
export default SuggestionTextField;


 const styles = {
    
        commentInput: {
        	width:'74%'
          },
         textareaStyle:{
         	marginTop:0
         }	

    }