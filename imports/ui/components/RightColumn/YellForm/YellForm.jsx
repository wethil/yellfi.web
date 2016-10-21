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
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash'
import {musicGenres,filmGenres} from './Constant.js'
import { browserHistory } from 'react-router'


const dataSource1 = ['hiphop', 'rap', 'jazz']

export default class YellForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePlan: 9,
			forms: false, //value presents hidden step
			publicity: 0,
			date: 0,
			time: 0,
			publicGeoLoc:{},
			ipLoc:{},
			customPlan:"",
			keyword:""	
		};
	}

	componentDidMount() {
		//from EtraFormElements
		emitter.addListener('changeipLoc',(ipLoc)=> this.setState({ipLoc}) );
		emitter.addListener('changeDate', (date) => {this.setState({date}); console.log(date) }  );
		emitter.addListener('changeTime', (time) => {this.setState({time}); console.log(time)  } );
		emitter.addListener('changepublicGeoLoc', (publicGeoLoc) => this.changepublicGeoLoc(publicGeoLoc));
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

	closeFormDrawer () {
		this.setState({ 
				forms: false,
				activePlan: 9,
				forms: false, //value presents hidden step
				publicity: 0,
				date: 0,
				time: 0,
				customPlan:""
				
			 }) 
	}
	
	changepublicGeoLoc(publicGeoLoc) {
		console.log(publicGeoLoc)
		this.setState({publicGeoLoc})
	}

	handleSelectChange() {

		this.setState({
			forms: '',
			plans: 'hidden'
		})
	}

	autocompleteUpdate(searchText) {
		console.log('update')
		console.log(searchText)
	}

	autocompleteRequest(chosenRequest,index){
		console.log('request')
		console.log(chosenRequest)
		console.log(index)
	}

	changePublicity(e) {
		this.setState({publicity})
	}

	handleSubmit() {
	let	activePlan = this.state.activePlan
	let	publicity = this.state.publicity
	let	date = this.state.date==0 ? new Date : this.state.date
	let	time = this.state.time==0 ? new Date : this.state.time
	let	publicGeoLoc = this.state.publicGeoLoc
	let	userCoordinates = this.state.userCoordinates 
	let coordinates = !this.state.publicGeoLoc.coordinates ? [userCoordinates] : [userCoordinates,publicGeoLoc.coordinates]//came from rightcolumn.jsx
	let geoLocAdress = this.state.publicGeoLoc.geoLocAdress ? this.state.publicGeoLoc.geoLocAdress : ""
	let loc = {type:"MultiPoint",coordinates:coordinates, geoLocAdress:geoLocAdress}
 	let plan = this.state.activePlan==10 ? document.getElementById("customPlan").value : plans[this.state.activePlan].content
	let keyword = $('#keywordInput').val()
	let ownerId = Meteor.userId();
	console.log(loc)

	
		Meteor.call('addYell',loc,plan,keyword,time,publicity,ownerId,function (error, result){
			if (error) {
				console.log(error)
			} else {
				emitter.emit('getSuggestion')
				browserHistory.push('/yell/'+result)
			}
		});	





	}

	render() {
		

	ipLoc = this.state.ipLoc
	coord = ipLoc.coordinates ? ipLoc.coordinates[0] + ' ' + ipLoc.coordinates[1] : "there is no coordinate"
	formAppBarIcon = <IconButton onMouseDown={this.closeFormDrawer.bind(this)}> <NavigationArrowBack style={{color:'white'}} /></IconButton>
	customPlan = this.state.activePlan == 10 ? <TextField id="customPlan" hintText="Enter a plan."/> : <div className="className"></div>
  if (_.includes([0,1,5,6], this.state.activePlan ) ) {
  	hintForKeywords = "Choose or write something for your plan." 
  } else {
  	hintForKeywords = "Write something for your plan. (optional)" 
  }

  switch(this.state.activePlan) {
    case 0:
        dataSource = musicGenres;
        break;
    case 1:
        dataSource = filmGenres;
        break;
    default:
        dataSource = [];

       dataSourceConfig = {
       	text :'title', 
       	value : 'id'
       } 
}


		return (

			<div>
				<Menu
						onItemTouchTap={
							(event, menuItem) => { 
								this.setState({ 
								forms: true,
								activePlan: menuItem.props.value //look at plans array on the bottom
								});
								if (menuItem.props.value==7) { //if hangout with someone, select everyone can join
									this.setState({publicity:1})
								}

							}}
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
				{coord} 

				<Drawer width={280} openSecondary={true} open={this.state.forms} >
					<AppBar
						titleStyle={styles.formTitle}
						iconElementLeft={formAppBarIcon} // form drawer title icon
						title={plans[this.state.activePlan].content}  
						/>

					<div style={styles.drwPadd} >

					{customPlan} {/*custom plan textfield*/}
						<RadioButtonGroup 
									name="privacy"  
								 	style={{ marginTop: 16 }}
								 	onChange={(event, value) => this.setState({ publicity: value }) } 
								 	defaultSelected={0}
								 	valueSelected={this.state.publicity}>
							<RadioButton
								value={0}
								label="Just me"
								disabled={this.state.activePlan == 7 ? true : false} //disabled if user choose hangout with someone
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


						{this.state.publicity == 0 ?

							<div className="className"></div>
							:
							<ExtraFormElements />
						}

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

const plans = [
	{ id: 0, content: 'Listening Music', icon: "audiotrack" },
	{ id: 1, content: 'Watching Something', icon: "movie_creation"},
	{ id: 2, content: 'Reading a Book', icon:"local_library" },
	{ id: 3, content: 'Eating and Drinking', icon:"restaurant" },
	{ id: 4, content: 'Cooking', icon:"whatshot"  },
	{ id: 5, content: 'Going Outside', icon:"nature_people" },
	{ id: 6, content: 'Going to Shopping', icon:"shopping_cart" },
	{ id: 7, content: 'Hanging out with Someone', icon:"local_cafe" },
	{ id: 8, content: 'Biking', icon:"directions_bike"  },
	{ id: 9, content: 'Hiking', icon:"directions_run" },
	{ id: 10, content: 'Custom', icon:"add" }
]

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