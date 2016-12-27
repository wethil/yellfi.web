import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import emitter from '../../../emitter.js'


export const PublicityLabel = (props) => {
switch(props.publicity){
	case 0:
		label = i18n.__('common.publicity.alone')
	break;
	case 1:
		label = i18n.__('common.publicity.everyone')
	break;
	case 2:
		label = i18n.__('common.publicity.elected')
	break;	
}


 return	(
  			<span>  <a className="ui mini circular label"><i className="user icon"></i> {label}</a>  </span> 
		);
 }



export  const ParticipationsButton = (props) => {
buttonContent =<button onClick={()=>  browserHistory.push('/y/'+props.yellId + '?dialog=joining')} 
       				 className=" mini ui button basic violet">{i18n.__('common.YellCard.participation')} {props.jq} </button>	
switch(props.publicity){
	case 0:
		button = null
	break;
	case 1:
		button = buttonContent
	break;
	case 2:
		button = buttonContent
	break;	
}


 return	(
  		<span>{button} </span>
		);
 };





export class Login extends Component {

 		handleLogin(){
			Meteor.loginWithFacebook({
				requestPermissions: ['public_profile', 'email']
			}, function(err){
				if (err) {
					throw new Meteor.Error("Facebook login failed");
				} else {
					 emitter.emit('userLogin')
					 emitter.emit('loginOnDialog')
				}
			});
		}

		handleTWLogin(){
			Meteor.loginWithTwitter(function(err){
				if (err) {
					console.log(err)
				} else {
					emitter.emit('userLogin')
					emitter.emit('loginOnDialog')
				}
			})
		}

	render() {
//1 is comment, 2 is joinings
		switch(this.props.dcn) {
			case 1:
				fBtnCont= i18n.__('common.anonMain.signInToSuggest')
				twtBtnCont = i18n.__('common.anonMain.signInTwitToSuggest')
				break;
			case 2 : 
				fBtnCont= i18n.__('common.anonMain.signInToJoin')
				twtBtnCont = i18n.__('common.anonMain.signInTwitToJoin')

		}

		return (
					<div className="ui equal width center aligned grid">
						<div className="row">
						    <div style={styles.columnLeft}  className="column">
						     <button onClick={this.handleLogin.bind(this)} className="ui facebook fluid button">
								<i className="facebook icon"></i>
								{fBtnCont}
							</button>
						    </div>
						    <div style={styles.columnRight} className="column">
							<button onClick={this.handleTWLogin.bind(this)} className="ui fluid twitter button">
							  <i className="twitter icon"></i>
							  {twtBtnCont}
							</button>
						    </div>
						  </div>
					</div>	
		);
	}
}

const styles={
	grid:{
    	padding: '1em 0.5em'
	},
	columnLeft:{
		paddingLeft:'0em',
		paddingRight:'0.1em',

	},
	columnRight:{
		paddingLeft:'0.1em',
		paddingRight:'0em',

	}
}