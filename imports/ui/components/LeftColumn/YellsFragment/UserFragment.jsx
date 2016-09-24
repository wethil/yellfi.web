import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserYells from '../Yells/UserYells.jsx'
import OthersYells from '../Yells/OthersYells.jsx'
import ApprovedYells from '../Yells/ApprovedYells.jsx'
import SwipeableViews from 'react-swipeable-views';
import emitter from '../../emitter.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NoUserYell from '../Yells/YellsComponents/NoUserYell.jsx'

 class UserFragment extends Component {
 	constructor(props) {
	  super(props);
	
	  this.state = {
	  	activeTab:0,
	  	user:0
	  };
	}

	componentDidMount() {
		emitter.addListener('noUserYellAnim', ()=> { $('.fab').addClass('animated infinite tada') } );
	}

	changeTab(value){
		this.setState({activeTab:value})
		$('.fab').addClass('animated zoomIn');
		$('.fab').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>$('.fab').removeClass('animated zoomIn'));

	}

	toogleDrawer () {
		
		emitter.emit('toogleDrawer')
	}


	handleLogout(e) {
		e.preventDefault()
		Meteor.logout();
		emitter.emit('userLogout')
		console.log('click logout')
	}

	noUserYellAnima() { //active if no user yell. Toogled From NoUserYell component
		console.log('nu user yell')
			$('.fab').addClass('animated infinite tada')
	}

	render() {
		ipLoc=this.props.ipLoc
		
		return (
			
		        <div className="className">
		          <Tabs value={this.state.activeTab}
		          		onChange={this.changeTab.bind(this)}
		          		>
		            <Tab style={styles.tab_style}
		            	 value={0}		  
		                 label="MY PLANS" />

								

		            <Tab style={styles.tab_style}
		            	 value={1}	
		            	 //onActive={this.toogleAnim.bind(this)}
		                  label="OTHERS" /> 

		                  

		           


		            <Tab style={styles.tab_style}
		            	 value={2}	
		                 label="APPROVED" /> 

		              	 
		          </Tabs>
		          	 <SwipeableViews
		          	 	style={{ position:'absolute'}}	
				          index={this.state.activeTab}
				          onChange={this.changeTab.bind(this)}
				        >
							<div> <UserYells /> </div>
							<div><OthersYells  ipLoc={ipLoc} /></div>
							<div><ApprovedYells/></div>
		               </SwipeableViews>
		                
		                 <FloatingActionButton onClick={this.toogleDrawer.bind(this)} className="fab" style={styles.fab} >
						      <ContentAdd />
						 </FloatingActionButton>
		                
		      </div>
		);
	}
}
export default UserFragment;


     const styles = {
        fab:{
          bottom: '5%',
          right:'4%',
          position:'absolute'
        },
        tab_style:{}


    }

/* <UserYells />
  <button 
		                 		className="ui button"
		                 		onClick={(e)=>{this.handleLogout(e)}}>
		                 		logout
		                 		</button>  */