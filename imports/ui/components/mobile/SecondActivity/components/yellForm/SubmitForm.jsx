import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {plans,musicGenres,filmGenres,foods,eatDrinkTr,eatDrinkEng,shoppingEng,shoppingTr,placesTr,placesEng} from '../../../../constants.js';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import emitter from '../../../../emitter.js';// it is using main emitter to connect SuggestionPaws
import { browserHistory } from 'react-router'
import _ from 'lodash';

 class SubmitForm extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	locInputStyle:{display:'none'},
 	  	choosenDate:"",
 	  	publicGeoLoc:{},
 	  	chosenKeyword:"",
 	  	chosenIndex:"null"
 	  };
 	}

 	componentDidMount() {
	var input = document.getElementById('places');
	var autocomplete = new google.maps.places.Autocomplete(input);
	google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
			var place = autocomplete.getPlace();
			console.log(place)
			myLatLng = place.geometry.location
			var lat = myLatLng.lat();
			var lng = myLatLng.lng();
			
			publicGeoLoc={
					coordinates:[lng,lat],
					geoLocAdress:place.formatted_address
				}
				this.setState({publicGeoLoc:publicGeoLoc})	
			});
		
	placeholderMap=i18n.__('common.yellForm.mapPlaceHolder')
	$("#places").attr("placeholder", placeholderMap).val("").focus().blur();
	

}

	componentWillMount(){
	
	 
		const {publicity} = this.props
		this.changePublicity(publicity)
	}

	componentWillReceiveProps(nextProps){

		const {publicity} = nextProps
		this.changePublicity(publicity)
		
	}

	changePublicity(publicity){
		this.setState({publicity:publicity})
		if(publicity==0){
			this.setState({locInputStyle:{display:'none'}})
		}else{
			this.setState({locInputStyle:{}})
			
		}
	}

	changeDate(date){

		this.setState({choosenDate:date})
		console.log(moment().format('hh:mm'))
	}

		autocompleteRequest(chosenRequest,index){
		this.setState({keyword:chosenRequest.value})
		this.setState({chosenKeyword:chosenRequest,chosenIndex:index})


	}


	submitPlan(){
		const {coordinates,chosenPlan} = this.props 
		const {publicGeoLoc,publicity,chosenKeyword,chosenIndex} = this.state
		let loc = {type:"Point",coordinates:coordinates}
		let plc=publicGeoLoc
		let publicPlanLoc = (plc.coordinates && plc.coordinates.length>0) ? {type:"Point",coordinates:plc.coordinates, adress:plc.geoLocAdress}:loc
		if (chosenPlan==10){
			 customPlan = document.getElementById("customPlan").value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
			var plan = (customPlan!="") ? customPlan :  _.random(0, 10);  
		} else {
			var plan = chosenPlan
		}
		let keyword = $('#keywordInput').val().replace(/^\s+|\s+$|\s+(?=\s)/g, "")
		let suggestionCoord= (plc.coordinates && plc.coordinates.length>0)? plc.coordinates : coordinates
		let time = $('#timeField').val()
		let date = $('#dateField').val()
		formatted = moment(new Date(`${date} ${time}`)).format()
		if (moment.isDate(formatted)) {
			//console.log('formatted is date')
			time = formatted
		} else {
			//console.log('is not')
			time = new Date()
		}
		
		Meteor.call('addYell',loc,publicPlanLoc,plan,keyword,time,publicity,function (error, result){
				if (error) {
					console.log(error)
				} else {
					console.log(plan)
					emitter.emit('suggestionToUser',plan,keyword,chosenKeyword,chosenIndex,result,suggestionCoord);
					browserHistory.push('/yell/'+result + '?dialog=comment')
					
				}
			});	
			

		
			

	}

	handleBack(){
		 emitter.emit('backToPlanList')
	}



	render() {

		const {publicity,locInputStyle,minTime,maxTime} = this.state
		const {chosenPlan} = this.props
		hintForKeywords = (_.includes([0,1,5,6],chosenPlan) )? i18n.__('common.yellForm.chooseOrWrite'): i18n.__('common.yellForm.writeSomething')
 		lang=i18n.getLocale()
 switch(chosenPlan) {
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
<MuiThemeProvider muiTheme={getMuiTheme()}>
	<div>

	{ chosenPlan==10?<TextField //location autocomplete
						style={{ fontSize: 13 }}
						multiLine={false}
						hintText={i18n.__('common.yellForm.customPlan')}
						id="customPlan"
						fullWidth={true}
							/>:null
	}

					<AutoComplete
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
						targetOrigin={{ vertical: 'bottom', horizontal: 'left'}}
						id="keywordInput"
						fullWidth={true}
								/>

					<span style={locInputStyle} >	
						 <TextField //location autocomplete
							inputStyle={{ fontSize: 13 }}
							multiLine={false}
							id="places"
							fullWidth={true}
							/>
					</span>		

			{publicity!=0?
					<div >			   
						<div  style={styles.dateTime} className="ui two column grid ">
							<div className="column">
								<TextField //date
									inputStyle={{ fontSize: 13 }}
									multiLine={false}
									type="date"
									required
									hintText={i18n.__('common.yellForm.date')}
									id="dateField"
									style={{width:128}}
									min={moment().format('YYYY-MM-DD')}
									onChange={(e)=>this.changeDate(e.target.value)}
									/>
							</div>
							<div className="column">
								<TextField //time
									inputStyle={{ fontSize: 13 }}
									style={{width:120,marginLeft:'22%'}}
									multiLine={false}
									type="time"
									required
									id="timeField"
									hintText={i18n.__('common.yellForm.time')}
									/>
							</div>
						</div>
					</div>:null}	
			<div style={styles.actions} >
					 <button  className="ui fluid circular blue big button" onClick={this.submitPlan.bind(this)}>
					 	Create 
					 </button>	
					 <div style={styles.divider} id="divider" className="ui  divider"></div>	
					 <div style={styles.backBtnCont} >	
					<button style={styles.backBtn} className="ui fluid circular red basic backBtn mini button" onClick={this.handleBack.bind(this) }>
						<i className="left chevron mini icon"></i>
					 	back 
					 </button>
				</div>		 
			</div>

				 
						
	</div>
</MuiThemeProvider>	 
		);
	}
}
export default SubmitForm;


const styles = {
		  labelStyle:{
		        fontSize:11,
		        margin:1
		      },
		      dateTime : {
		      	width:260
		      },
		      dateTimeForm:{
		      	width :115,
		      	fontSize:16
		      },
		      actions:{
			    zIndex:99
		      },
		      backBtnCont:{
			    zIndex: 50
		      },
		      divider :{
		      	marginTop:'2%',
		      	marginBottom:'2%'
		      },
		      backBtn:{
		      	paddingTop: '1%',
		      	paddingBottom: '1%',
		      }
		      
		};
