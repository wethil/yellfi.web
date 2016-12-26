import React, { Component } from 'react';
import emitter from '../../emitter.js'
import {mailAddress} from '../../constants.js';

 class LogInPageD extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	lang:i18n.getLocale()
 	  };
 	}

	handleLogin(){
			Meteor.loginWithFacebook({
				requestPermissions: ['public_profile', 'email']
			}, function(err){
				if (err) {
					throw new Meteor.Error("Facebook login failed");
				} else {
					 emitter.emit('userLogin')
				}
			});
		}

		handleTWLogin(){
			Meteor.loginWithTwitter(function(err){
				if (err) {
					console.log(err)
				} else {
					emitter.emit('userLogin')
				}
			})
		}


		changeLang(value){
			moment.locale(value);
			i18n.setLocale(value).then(()=>{
				this.setState({lang:value});
			})
			
		}

	render() {

	toMail= `mailto:${mailAddress}`

		var lang = i18n.getLocale()
	if (lang=="tr" || lang== "tr-TR") {
		langButton = <a href="#" onClick={()=>this.changeLang('en-US')} > English </a>
	} else {
		langButton = <a href="#"onClick={()=>this.changeLang('tr-TR')}> Türkçe </a>
	}


		return (
			<div className="ui container" id="container" >
				<div  className="ui center aligned padded grid">	
				<div>
					<h1 className="ui center aligned header" style={styles.header} > yellfi </h1>
					<h5 className="ui center aligned header" style={styles.subHeader}> {i18n.__('common.anonMain.slogan')} </h5>
					
				</div>
				<div style={styles.grid} className="ui center aligned basic segment">
				<div className="ui equal width center aligned grid">
						<div className="row">
						    <div style={styles.columnLeft}  className="column">
						     <button onClick={this.handleLogin.bind(this)} className="ui facebook fluid button">
								<i className="facebook icon"></i>
								{i18n.__('common.anonMain.facebookLogin')}
							</button>
						    </div>
						    <div style={styles.columnRight} className="column">
							<button onClick={this.handleTWLogin.bind(this)} className="ui fluid twitter button">
							  <i className="twitter icon"></i>
							  {i18n.__('common.anonMain.twitterLogin')}
							</button>
						    </div>
						  </div>
					</div>	
					  <div className="ui horizontal divider">
						    {i18n.__('common.anonMain.or')}
						</div>
				   <button onClick={()=>emitter.emit('changeTabIndex',1)} className="ui fluid primary button">
						<i className="unhide icon"></i>
						{i18n.__('common.anonMain.takeLook')}
					</button>
				</div>	
				<div className="ui equal width center aligned grid">
						<div className="row">
						    <div className="column">
						     <a href={toMail}> {i18n.__('common.anonMain.contact')} </a>
						    </div>
						    <div className="column">
						     {langButton}
						    </div>
						  </div>
					</div>	
			
				</div>
			
			</div>
		);
	}
}
export default LogInPageD;

const styles={
	header:{
		fontSize:'6em',
	    color:'#3F51B5',
	    fontFamily: "'McLaren', cursive",
	    marginTop:'0.1em'
	},
	subHeader:{
		marginTop: '0.1em',
	    color: '#9E9E9E'
	},
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




/*
				<div className="ui equal width center aligned grid">
						<div className="row">
						    <div className="column">
						     <button onClick={this.handleLogin.bind(this)} className="ui fluid  facebook button">
								<i className="facebook icon"></i>
								{i18n.__('common.anonMain.facebookLogin')}
							</button>
						    </div>
						    <div className="column">
							<button onClick={this.handleTWLogin.bind(this)} className="ui fluid twitter button">
							  <i className="twitter icon"></i>
							  {i18n.__('common.anonMain.twitterLogin')}
							</button>
						    </div>
						  </div>
					</div>	
*/