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
import {plans,musicGenres,filmGenres,foods,eatDrinkTr,eatDrinkEng,shoppingEng,shoppingTr,placesTr,placesEng} from '../../constants.js';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash'
import { browserHistory } from 'react-router'
 const T = i18n.createComponent();

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
			keyword:"",
			chosenKeyword:{},
			chosenIndex:null
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
		console.log('close')
		this.setState({ 
				forms: false,
				activePlan: 9,
				publicity: 0,
				date: new Date,
				time: new Date,
				customPlan:"",
				keyword:"",
				chosenKeyword:{},
				chosenIndex:null
				
			 }) 
		$('#keywordInput').val("")
	}

	drawerMove(){
		$('#keywordInput').val("")
		this.setState({keyword:""})
	}
	
	changepublicGeoLoc(publicGeoLoc) {
		//console.log(publicGeoLoc)
		this.setState({publicGeoLoc})
	}

	handleSelectChange() {this.setState({forms: '',plans: 'hidden'})}

	autocompleteUpdate(searchText) {

		console.log(searchText)
	}

	autocompleteRequest(chosenRequest,index){
		this.setState({keyword:chosenRequest.value})
		this.setState({chosenKeyword:chosenRequest,chosenIndex:index})

	}


	handleSubmit() {
		const {activePlan,publicity,time,date,publicGeoLoc,chosenKeyword,chosenIndex} = this.state
		const {userCoordinates} = this.props
		let loc = {type:"Point",coordinates:userCoordinates}
		let plc=publicGeoLoc
		let publicPlanLoc = (plc.coordinates && plc.coordinates.length>0) ? {type:"Point",coordinates:plc.coordinates, adress:plc.geoLocAdress}:loc
	 	if (activePlan==10){
			 customPlan = document.getElementById("customPlan").value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
			var plan = (customPlan!="") ? customPlan :  _.random(0, 10);  
		} else {
			var plan = activePlan
		}
		let keyword = $('#keywordInput').val().replace(/^\s+|\s+$|\s+(?=\s)/g, "")
		let suggestionCoord= (plc.coordinates && plc.coordinates.length>0)? plc.coordinates : userCoordinates
		console.log(chosenIndex)
		


	
		Meteor.call('addYell',loc,publicPlanLoc,plan,keyword,time,publicity,function (error, result){
				if (error) {
					console.log(error)
				} else {
					//LeftNavHead
					emitter.emit('suggestionToUser',plan,keyword,chosenKeyword,chosenIndex,result,suggestionCoord)
					browserHistory.push('/yell/'+result)
				}
			});	





	}

	render() {
		
		
	const {ipLoc,activePlan,publicity} = this.state
	formAppBarIcon = <IconButton onMouseDown={this.closeFormDrawer.bind(this)}> <NavigationArrowBack style={{color:'white'}} /></IconButton>
	customPlan = (activePlan == 10 )? <TextField id="customPlan"   maxLength="41" hintText={i18n.__('common.yellForm.customPlan')}/> : null
	hintForKeywords = (_.includes([0,1,5,6],activePlan) )? i18n.__('common.yellForm.chooseOrWrite'): i18n.__('common.yellForm.writeSomething')
	privacySection = (activePlan == 7) ? true : false
	
	lang=i18n.getLocale()
  switch(activePlan) {
    case 0:
        dataSource = musicGenres;
        dataSourceConfig = {text :'title', value : 'id'}
        break;
    case 1:
        dataSource = filmGenres;
        dataSourceConfig = {text :'title', value : 'id'}
        break;
     case 3:
        dataSource = (lang=="tr-TR")? eatDrinkTr:eatDrinkEng
        dataSourceConfig = { text: 'value', value: 'title'}
        break;    
    case 4:
        dataSource = foods;
        dataSourceConfig = {text :'title', value : 'id'}
        break;
    case 5:
       dataSource = (lang=="tr-TR")? placesTr:placesEng
        dataSourceConfig = { text: 'value', value: 'title'}
        break; 
     case 6:
         dataSource = (lang=="tr-TR")? shoppingTr:shoppingEng
        dataSourceConfig = { text: 'value', value: 'title'}
        break;   
    default:
        dataSource = [];
        dataSourceConfig = { text: 'value', value: 'title'}
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
									primaryText={i18n.__(plan.content)} />;
					}) }
				</Menu>
				<Drawer width={280} onRequestChange={this.drawerMove.bind(this)} openSecondary={true} open={this.state.forms} >
					<AppBar
						titleStyle={styles.formTitle}
						iconElementLeft={formAppBarIcon} // form drawer title icon
						title={i18n.__(plans[activePlan].content)}  
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
							<RadioButton value={0} label={i18n.__('common.publicity.justMe')} disabled={privacySection} style={styles.radioButton}/>
							<RadioButton value={1} label={i18n.__('common.publicity.everyoneCan')}  style={styles.radioButton} />
							<RadioButton value={2} label={i18n.__('common.publicity.willChoose')}style={styles.radioButton}/>
						</RadioButtonGroup>
					
					{this.state.forms==true?<span><AutoComplete
							//onUpdateInput={ (searchText)=> this.autocompleteUpdate(searchText)}
							onNewRequest={ (chosenRequest,index)=> this.autocompleteRequest(chosenRequest,index)}
							floatingLabelText={hintForKeywords}
							hintText="Click and choose"
							filter={AutoComplete.fuzzyFilter}
							textFieldStyle={{ fontSize: 13 }}
							dataSource={dataSource}
      						dataSourceConfig={dataSourceConfig}
      						maxSearchResults={5}
      						searchText = ""
      						id="keywordInput"
							/><br /></span>:<span></span>}	
							


						{publicity == 0 ?null:<ExtraFormElements />}

						<RaisedButton
							onClick={this.handleSubmit.bind(this)}
							style={{ width: 256 }}
							label={i18n.__('common.yellForm.getSugg')}
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