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
 	 comment = this.state.comment
 		if (keycode=='Enter' && comment.replace(/\s+/, "") !="" ) {
 		  
  			this.makeSuggestion(comment)

 		}
 	}
 	

 	makeSuggestion(comment)
 	{
 		sugg=comment.replace(/^\s+|\s+$|\s+(?=\s)/g, "")
 		let yellId = this.props.yellId
 		let yellOwnerId = this.props.yellOwnerId
 		let ownerId = Meteor.userId();
 
		Meteor.call('addComment',sugg,yellId,yellOwnerId,ownerId,error=>{
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
				      hintText={i18n.__('common.comments.writeSuggEnter')}
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
        	//width:'74%'
          },
         textareaStyle:{
         	//marginTop:0
         }	

    }