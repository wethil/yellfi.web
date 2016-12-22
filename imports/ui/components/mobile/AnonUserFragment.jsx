import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import LogInPage from './MainActivity/anon/LogInPage.jsx'
import AnonFeed from './MainActivity/anon/AnonFeed.jsx'
import AnonPublicPlans from './MainActivity/anon/AnonPublicPlans.jsx'
import emitter from './emitter.js'

 class AnonUserFragment extends Component {
 	 constructor(props) {
 	  super(props);
 	  this.state = {
 	  	activeTab:0,
 	  	swipe:true
 	  };
 	}

 componentDidMount(){
 	 emitter.addListener('changeTab',()=> this.setState({activeTab:1}) );
 }

changeTab(value){
		this.setState({activeTab:value})
		swipe = (value==2)? true : false
		this.setState({swipe:swipe})
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

	render() {
		var time = new Date();
		var year = time.getFullYear();

		const {activeTab,swipe} = this.state
		if (activeTab==0) {
			bottomMenu = <a className="item"> yellfi | {year} </a>
		} else {
			bottomMenu =  <button style={{paddingBottom:14,borderRadius:'0em'}} onClick={this.handleLogin.bind(this)} className="ui fluid facebook button">
							<i className="facebook icon"></i>
							{i18n.__('common.anonMain.signInToCreate')}
					</button>
		}



		return (
	<div id="mainDiv" style={{height:'100vh',padding:'0px !important'}} >
			 <Tabs
		          onChange={this.changeTab.bind(this)}
		          value={activeTab}
		          tabItemContainerStyle={styles.tabs} 
		          style={{backgroundColor:'rgb(63, 81, 181)'}}>	
						<Tab icon={<FontIcon className="material-icons">exit_to_app</FontIcon>} value={0} />
						<Tab icon={<FontIcon className="material-icons">web</FontIcon>} value={1} />
						<Tab icon={<FontIcon className="material-icons">place</FontIcon>} value={2} />
 			 </Tabs>
  		
				
				
			<SwipeableViews index={activeTab}
							animateTransitions={false}
							disabled={swipe}
							onChangeIndex={this.changeTab.bind(this)}>
					<div><LogInPage /> </div>
					<div> <AnonFeed activeTab={activeTab}  /> </div>
					<div><AnonPublicPlans activeTab={activeTab} coordinates={this.props.coordinates} /> </div>
			</SwipeableViews>
					
				<div id="bottomMenu" className="ui bottom fixed vertical fluid one item menu">  
					{bottomMenu}
				</div>	
			</div>
		);
	}
}
export default AnonUserFragment;


const styles= {
	hidden:{
		display:'none',
		overflow:'hidden'
	},
	 tabs:{
        	backgroundColor:'rgb(63, 81, 181)',
        	position:'fixed',
        	zIndex:'999'
        }
}

