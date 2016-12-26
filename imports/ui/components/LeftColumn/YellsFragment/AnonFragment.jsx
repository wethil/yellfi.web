import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LogInPageD from '../Accounts/LogInPageD.jsx'
import MainPlansFeed from './FragmentContainers/MainPlansFeed.jsx'
import SwipeableViews from 'react-swipeable-views';
import emitter from '../../emitter.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



 class AnonFragment extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	activeTab:1,
 	  	activeTabIndex:0
 	  };
 	}

 	componentDidMount(){
 			emitter.addListener('changeTabIndex',(value)=> this.changeTab(value));
 	}

 		changeTab(value){
	 switch(value) {
	    case 0:
	        this.setState({activeTab:1});
	        $('.fab').toggleClass('hidden',true)     
	        break;
	    case 1:
			this.setState({activeTab:0});
			$('.fab').toggleClass('hidden',false)
	        break;
		}
		this.setState({activeTabIndex:value})


	}


	render() {
		const {activeTab,activeTabIndex} = this.state
		return (
			 <div>	
			 	<Tabs  
					tabTemplateStyle={{zIndex:333}} 
					tabItemContainerStyle={styles.tabs}
					contentContainerStyle={{zIndex:444}} 
					inkBarStyle={{zIndex:222}}
					style={styles.tabs} 
					value={activeTabIndex} 
					onChange={this.changeTab.bind(this)}>
			<Tab style={styles.tab_style} value={0} label={i18n.__('common.anonFrg.login')} /> 
			<Tab style={styles.tab_style} value={1}  label={i18n.__('common.anonFrg.feed')} />
		
		</Tabs>
		  <SwipeableViews 
		  	index={activeTabIndex} 
		  	onChange={this.changeTab.bind(this)}
		  	animateTransitions={false}>
			 <div> <LogInPageD activeTab={activeTab}  /> </div>
			<div><MainPlansFeed activeTab={activeTab} /> </div>
		</SwipeableViews>


		<FloatingActionButton onClick={()=>this.changeTab(0)} className="hidden fab" style={styles.fab} >
			<ContentAdd />
		</FloatingActionButton>

		
		      </div>
		);
	}
}
export default AnonFragment;


     const styles = {
        tab_style:{
        	color:'white'
        },
        tabs:{
        	backgroundColor:'rgb(63, 81, 181)'
        },
        fab:{
          bottom: '5%',
          right:'4%',
          position:'absolute'
        },


    }
