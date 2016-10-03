import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CommentComposer from '../Comments/CommentComposer.jsx'
import TextField from 'material-ui/TextField';
import Linkify from 'linkifyjs/react';
import emitter from '../../emitter.js'
import Snackbar from 'material-ui/Snackbar';
import _ from 'lodash'	

 class YellCard extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {dialogOpen:false,sBar:false};
 	}

 	makeSuggestion()
 	{
 		let comCont = $('#suggestionInput').val()
 		let yellId = this.props.yell._id
 		let yellOwnerId = this.props.yell.ownerId
 		let ownerId = Meteor.userId();

 			
		Meteor.call('addComment',comCont,yellId,yellOwnerId,ownerId,function (error, result){
			if (error) {
				console.log(error)
			} else {
				console.log('okay')
				
			}
		});	
 	}


	render() {
				if(this.props.yell) {

const radios = [];

		yell = this.props.yell

		if(_.includes(yell.blocked_users, Meteor.userId()) ) {
			this.setState({dialogOpen:false})
		}

		switch(yell.publicity) {
	        case 0 : 
	           publicity = "Alone"
		    case 1:
		        publicity = "With Everyone"
		        break;
		    case 2:
		        publicity = "Elected ones"
		        break;		   
		}

		if (yell.publicity!=0) {
			publicityLabel = <span><a className="ui mini circular label"><i className="users icon"></i>{publicity}</a> </span>  
		} else {
			publicityLabel=""
		}

		userHeader =  <div>
						{yell.owner.username} 
						<span style={styles.subhead}> planned {moment(yell.created_at).startOf('hour').fromNow()} </span>
						
					</div>


  const actions = [
  <TextField
      id="suggestionInput"	
      hintText="Make a suggestion or paste a link!  "
      style={styles.commentInput}
    />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.makeSuggestion.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={()=> this.setState({dialogOpen:false})}
      />,
    ];


		return (
			<div>
				  <Card>
			        <CardHeader
			          title={userHeader}
			          style={styles.cardHeader}
			          subtitle={publicityLabel}
			          avatar={yell.owner.profile.avatar}
			        />

			      <CardTitle title={yell.plan} subtitle={moment(yell.time).calendar()}/>
			        <CardText>
			         <Linkify>   {yell.keyword}   </Linkify> 
			        </CardText>
			        <CardActions>
			         <FlatButton label="join"    />
			          <FlatButton label="suggest" onTouchTap={()=> this.setState({dialogOpen:true})}  />
			        </CardActions>
			      </Card>


	 <Dialog
			          //title="Scrollable Dialog"
			          contentClassName="dialogContent"
			          className="justclass"
			          actions={actions}
			          modal={false}
			          open={this.state.dialogOpen}
			          onRequestClose={()=>this.setState({dialogOpen:false})}
			          autoScrollBodyContent={true}
			        >
         <CommentComposer yellId={yell._id}  />
       
        </Dialog>



			</div>
		);
	} else {
		emitter.emit('closeDrawerForBeBlocked') //to RightColumn.jsx
	

		return (
			<div className="className">
				<h1 className="className">You do not have permission to see this plan anymore </h1>
			
			</div>
			)
	}

	}
}
export default YellCard;
		
 const styles = {
        subhead:{
          fontSize:11,
          color:'#9E9E9E'
        },
        commentInput: {
        	width:'74%'
        	        }

    }
