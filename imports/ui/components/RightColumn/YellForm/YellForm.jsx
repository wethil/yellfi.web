import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ImageAudiotrack from 'material-ui/svg-icons/image/audiotrack'
import ImageMovieCreation from 'material-ui/svg-icons/image/movie-creation'
import ImageNaturePeople from 'material-ui/svg-icons/image/nature-people'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
import MapsRetaurant from 'material-ui/svg-icons/maps/restaurant'
import MapsLocalCafe from 'material-ui/svg-icons/maps/local-cafe'
import MapsDirectionsBike from 'material-ui/svg-icons/maps/directions-bike'
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import SocialWhatShot from 'material-ui/svg-icons/social/whatshot'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import ExtraFormElements from './ExtraFormElements.jsx'
import emitter from '../../emitter.js'
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';


const dataSource1 =  ['hiphop','rap','jazz']		

export default class YellForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	activePlan:9, 
	  	forms:false, //value presents hidden step
	  	publicity:0,
	  	date:0,
	  	time:0
	  };
	}

	componentDidMount() {

		 emitter.addListener('changeDate', (date)=> this.changeDate(date) );
		 emitter.addListener('changeTime', (time)=> this.changeTime(time) );
		 emitter.addListener('changePublicOpt', (publicOpt)=> this.changePublicOpt(publicOpt) );

		

}
changeDate (date){
 console.log(date)
}
changeTime (time){
 console.log(time)
}
changePublicOpt(publicOpt) {
	console.log(publicOpt)
}

	handleSelectChange () {
		
		this.setState({
			forms:'',
			plans:'hidden'
		})
	}

	changePublicity(e) {
		console.log(value)
	}

	render() {
		formAppBarIcon = <IconButton onMouseDown={()=>this.setState({forms:false})}> <NavigationArrowBack /></IconButton>
		
		return (
	
				<div>
					  
			             <Menu
			                onItemTouchTap={(event,menuItem)=>{ this.setState({forms:true, activePlan:menuItem.props.value}); console.log(menuItem.props.value)  } }
			                listStyle={{cursor:'pointer'}}>
			                   
			                  {plans.map((plan) => {
			                        return <MenuItem   key={plan.id} leftIcon={plan.icon} value={plan.id} primaryText={plan.content} />;
			                      })}
			                </Menu>
			       
			       
<Drawer width={280} openSecondary={true} open={this.state.forms} >
					 <AppBar 
					 		titleStyle={styles.formTitle}
					 		iconElementLeft={formAppBarIcon}
			        		title={plans[this.state.activePlan].content}
			               />
	 					
			<div style={styles.drwPadd} >
			       	
			          		    <AutoComplete
							      hintText="Enter some keyword for your plan.(optional)"
							      filter={AutoComplete.noFilter}
							      openOnFocus={true}
							      dataSource={dataSource1}
							    /><br />

							    <RadioButtonGroup name="privacy"   onChange={(event,value)=>this.setState({publicity:value})} defaultSelected={0}>
								      <RadioButton
								        value={0}
								        label="Just me"
								       disabled={true}
								        style={styles.radioButton}
								      />
								      <RadioButton
								        value={1}
								        label="Everyone Can Join"
								       
								        style={styles.radioButton}
								      />
								      <RadioButton
								        value={2}
								        label="I'll choose participants"
								  
								        style={styles.radioButton}
								      />
								    </RadioButtonGroup>
								   		            

				{this.state.publicity==0 ? 

			          	<p style={styles.labelStyle}>'*You will get suggestion from us and other users' </p>
			          	: 
			          	<ExtraFormElements />
			        }
			         <RaisedButton fullWidth={true} label="Get Suggestions!" primary={true} />	
			          </div>
										          
	   </Drawer>

			          
				
				</div>
	
		);
	}
}

const  plans = [
			{id:0, content:'Listen To Music', icon:<ImageAudiotrack /> },
			{id:1, content:'Watch a Film', icon: <ImageMovieCreation />  },
			{id:2, content:'Read a Book', icon: <MapsLocalLibrary /> },
			{id:3, content:'Eat Something', icon:<MapsRetaurant /> },
			{id:4, content:'Cooking', icon : <SocialWhatShot />},
			{id:5, content:'Go Somewhere', icon:<ImageNaturePeople />},
			{id:6, content:'Hangout with Someone', icon:<MapsLocalCafe />},	
			{id:7, content:'Biking', icon:<MapsDirectionsBike />  },
			{id:8, content:'Hiking', icon: <MapsDirectionsRun /> },
			{id:9, content:'Custom', icon: <ContentAdd /> }
		]

const styles = {
		  drwPadd : {
		  	paddingLeft:10
		  },
		   radioButton: {
		    marginBottom: 16,
		  },
		  labelStyle:{
		        fontSize:11,
		        margin:1
		   },
		   formTitle:{
		   	fontSize:18
		   }
		};