import React, { Component } from 'react';
import  {frameStyle} from '../yells/YellsComponents/constant.js'
import emitter from '../../emitter.js'

 class LogInPage extends Component {
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


		changeLang(value){
			moment.locale(value);
			i18n.setLocale(value).then(()=>{
				this.setState({lang:value});
			})
			
		}

	render() {

	

		var lang = i18n.getLocale()
	if (lang=="tr" || lang== "tr-TR") {
		langButton = <a href="#" onClick={()=>this.changeLang('en-US')} > English </a>
	} else {
		langButton = <a href="#"onClick={()=>this.changeLang('tr-TR')}> Türkçe </a>
	}


		return (
			<div className="ui container" id="container" style={frameStyle}>
				<div  className="ui center aligned  grid">	
				<div>
					<h1 className="ui center aligned header" style={styles.header} > yellfi </h1>
					<h5 className="ui center aligned header" style={styles.subHeader}> {i18n.__('common.anonMain.slogan')} </h5>
					
				</div>
				<div style={styles.grid} className="ui center aligned basic segment">
					<button onClick={this.handleLogin.bind(this)} className="ui fluid facebook button">
						<i className="facebook icon"></i>
						{i18n.__('common.anonMain.facebookLogin')}
					</button>
					  <div className="ui horizontal divider">
						    {i18n.__('common.anonMain.or')}
						</div>
				   <button onClick={()=>emitter.emit('changeTab')} className="ui fluid primary button">
						<i className="unhide icon"></i>
						{i18n.__('common.anonMain.takeLook')}
					</button>
				</div>	
				<div className="ui equal width center aligned grid">
						<div className="row">
						    <div className="column">
						     <a href="#"> {i18n.__('common.anonMain.contact')} </a>
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
export default LogInPage;

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
	footer : {
		position: 'absolute',
	  	right: 0,
	  	bottom: 0,
	  	left: 0,
	  	padding: '1rem',
	  	backgroundColor: '#efefef'
	},
	grid:{
    	padding: '1em 0.5em'
	}
}




/*
	<div className="ui equal width center aligned grid">
						<div className="row">
						    <div className="column">
						     <a href="#"> Contact Us </a>
						    </div>
						    <div className="column">
						     <a href="#"> Türkçe </a>
						    </div>
						  </div>
					</div>	
*/