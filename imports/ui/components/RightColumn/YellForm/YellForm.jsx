import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import ExtraFormElements from './ExtraFormElements.jsx'
import emitter from '../../emitter.js'
import {plans} from '../../constants.js';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash'
import {musicGenres,filmGenres} from './Constant.js'
import { browserHistory } from 'react-router'


export default class YellForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePlan: 9,
			forms: false, //value presents hidden step
			publicity: 0,
			date: new Date,
			time: new Date,
			publicGeoLoc:{},
			ipLoc:{},
			customPlan:"",
			keyword:""	
		};
	}

	componentDidMount() {
		//from EtraFormElements
		emitter.addListener('changeipLoc',(ipLoc)=> this.setState({ipLoc}));
		emitter.addListener('changeDate', (date) => this.setState({date}));
		emitter.addListener('changeTime', (time) => this.setState({time}));
		emitter.addListener('changepublicGeoLoc', (publicGeoLoc)=> this.changepublicGeoLoc(publicGeoLoc));
	}

	componentWillMount(){
		coord=this.props.userCoordinates
		this.setState({userCoordinates:coord})
		if(Number.isNaN(coord[0]) || Number.isNaN(coord[1]) ) {
		 $.getJSON("http://ip-api.com/json/?callback=?", (data)=> {
		 		console.log('secret weapon fired!')
	           this.setState({userCoordinates:[data.lon,data.lat]})
	        });
		}
	}

handleTouchMenu(event,menuItem){
		this.setState({forms: true,activePlan: menuItem.props.value });//look at plans array on the bottom
		if (menuItem.props.value==7) { //if hangout with someone, select everyone can join
			this.setState({publicity:1})
		}
}

	closeFormDrawer () {
		this.setState({ 
				forms: false,
				activePlan: 9,
				forms: false, //value presents hidden step
				publicity: 0,
				date: new Date,
				time: new Date,
				customPlan:""
				
			 }) 
	}
	
	changepublicGeoLoc(publicGeoLoc) {
		console.log(publicGeoLoc)
		this.setState({publicGeoLoc})
	}

	handleSelectChange() {this.setState({forms: '',plans: 'hidden'})}

	autocompleteUpdate(searchText) {
		console.log('update')
		console.log(searchText)
	}

	autocompleteRequest(chosenRequest,index){
		console.log('request')
		console.log(chosenRequest)
		console.log(index)
	}


	handleSubmit() {
		const {activePlan,publicity,time,date,publicGeoLoc} = this.state
		//coordinates came from rightcolumn.jsx
		let loc = {type:"Point",coordinates:this.props.userCoordinates}
		let plc=publicGeoLoc
		let publicPlanLoc = plc.coordinates ? {type:"Point",coordinates:plc.coordinates, adress:plc.geoLocAdress}:false
	 	let plan = activePlan==10 ? document.getElementById("customPlan").value : activePlan
		let keyword = $('#keywordInput').val()
		let ownerId = Meteor.userId();
		Meteor.call('addYell',loc,publicPlanLoc,plan,keyword,time,publicity,ownerId,function (error, result){
				if (error) {
					console.log(error)
				} else {
					emitter.emit('getSuggestion')
					browserHistory.push('/yell/'+result)
				}
			});	

	}

	render() {
		

	const {ipLoc,activePlan,publicity} = this.state
	formAppBarIcon = <IconButton onMouseDown={this.closeFormDrawer.bind(this)}> <NavigationArrowBack style={{color:'white'}} /></IconButton>
	customPlan = (activePlan == 10 )? <TextField id="customPlan" hintText="Enter a plan."/> : null
	hintForKeywords = (_.includes([0,1,5,6],activePlan) )? "Choose or write something for your plan." : "Write something for your plan. (optional)" 
	privacySection = (activePlan == 7) ? true : false

  switch(activePlan) {
    case 0:
        dataSource = musicGenres;
        break;
    case 1:
        dataSource = filmGenres;
        break;
    default:
        dataSource = [];
}
   dataSourceConfig = {
       	text :'title', 
       	value : 'id'
       } 


		return (

			<div>
				<Menu
						onItemTouchTap={(event, menuItem) => this.handleTouchMenu(event,menuItem)}
						listStyle={{ cursor: 'pointer' }}>
					{plans.map((plan) => {
						return <MenuItem
							key={plan.id}
							innerDivStyle={{ width: 280 }}
							leftIcon={<FontIcon className="material-icons">{plan.icon}</FontIcon>}
							value={plan.id}
							primaryText={plan.content} />;
					}) }
				</Menu>
				<Drawer width={280} openSecondary={true} open={this.state.forms} >
					<AppBar
						titleStyle={styles.formTitle}
						iconElementLeft={formAppBarIcon} // form drawer title icon
						title={plans[activePlan].content}  
						/>

					<div style={styles.drwPadd} >

					{customPlan} {/*custom plan textfield*/}
						<RadioButtonGroup 
									name="privacy"  
								 	style={{ marginTop: 16 }}
								 	onChange={(event, value) => this.setState({ publicity: value }) } 
								 	defaultSelected={0}
								 	valueSelected={publicity}>
								 {/*disabled if user choose hangout with someone*/}
							<RadioButton value={0} label="Just me" disabled={privacySection} style={styles.radioButton}/>
							<RadioButton value={1} label="Everyone Can Join" style={styles.radioButton} />
							<RadioButton value={2} label="I'll choose participants" style={styles.radioButton}/>
						</RadioButtonGroup>
						<AutoComplete
							onUpdateInput={ (searchText)=> this.autocompleteUpdate(searchText)}
							onNewRequest={ (chosenRequest,index)=> this.autocompleteRequest(chosenRequest,index)}
							floatingLabelText={hintForKeywords}
							hintText="Click and choose"
							filter={AutoComplete.fuzzyFilter}
							textFieldStyle={{ fontSize: 13 }}
							dataSource={dataSource}
      						dataSourceConfig={dataSourceConfig}
      						 maxSearchResults={5}
      						//searchText = {this.state.keyword}
      						id="keywordInput"
							/><br />


						{publicity == 0 ?null:<ExtraFormElements />}

						<RaisedButton
							onClick={this.handleSubmit.bind(this)}
							style={{ width: 256 }}
							label="Get Suggestions!"
							primary={true} />
					</div>
				</Drawer>
			</div>

		);
	}
}



const styles = {
		  drwPadd: {
		paddingLeft: 10
		  },
	radioButton: {
		marginBottom: 16,
		  },
		  labelStyle: {
		fontSize: 11,
		margin: 1
	},
	formTitle: {
		fontSize: 18
	}
};