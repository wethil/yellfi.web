import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {plans,musicGenres,filmGenres,foods,eatDrinkTr,eatDrinkEng,shoppingEng,shoppingTr,placesTr,placesEng} from '../../../../constants.js';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import emitter from '../../../emitter.js'

 class SubmitForm extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	locInputStyle:{display:'none'},
 	  	choosenDate:"",
 	  	minTime:null,
 	  	maxTime:null
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
		console.log(date)
		this.setState({choosenDate:date})
		console.log(moment().format('hh:mm'))
		if (date==moment().format('YYYY-MM-DD')){
			this.setState({
				minTime:moment().format('hh:mm'),
				maxTime:'24:00'
			})
		} else {
				this.setState({
				minTime:null,
				maxTime:null
			})
		}
	}


	submitDate(){
		const {coordinates} = this.props 
		const {publicGeoLoc} = this.state
		let loc = {type:"Point",coordinates:coordinatess}


		Meteor.call('addYell',loc,publicPlanLoc,plan,keyword,time,publicity,ownerId,function (error, result){
				if (error) {
					console.log(error)
				} else {
					emitter.emit('suggestionToUser',plan,keyword,chosenKeyword,chosenIndex,result,suggestionCoord)
					browserHistory.push('/yell/'+result)
				}
			});	

	}



	render() {

		const {publicity,locInputStyle,minTime,maxTime} = this.state
		dataSource = musicGenres;
        dataSourceConfig = {text :'title', value : 'id'}
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div className="className">
									<AutoComplete
									//onUpdateInput={ (searchText)=> this.autocompleteUpdate(searchText)}
									//onNewRequest={ (chosenRequest,index)=> this.autocompleteRequest(chosenRequest,index)}
									//floatingLabelText={hintForKeywords}
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

								<AutoComplete
									//onUpdateInput={ (searchText)=> this.autocompleteUpdate(searchText)}
									//onNewRequest={ (chosenRequest,index)=> this.autocompleteRequest(chosenRequest,index)}
									//floatingLabelText={hintForKeywords}
									hintText="Click and choose"
									filter={AutoComplete.fuzzyFilter}
									textFieldStyle={{ fontSize:13 , marginTop:'-5%' }}
									dataSource={dataSource}
		      						dataSourceConfig={dataSourceConfig}
		      						maxSearchResults={5}
		      						searchText = ""
		      						targetOrigin={{ vertical: 'bottom', horizontal: 'left'}}
		      						id="keywoardInput"
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
						 <TextField //location autocomplete
										inputStyle={{ fontSize: 13 }}
										multiLine={false}
										type="date"
										hintText={i18n.__('common.yellForm.date')}
										id="dateField"
										style={{width:128}}
										textFieldStyle={styles.dateTimeForm}
										min={moment().format('YYYY-MM-DD')}
										onChange={(e)=>this.changeDate(e.target.value)}
										/>
					</div><br/>
					<div className="column">
						<TextField //location autocomplete
										inputStyle={{ fontSize: 13 }}
										textFieldStyle={styles.dateTimeForm}
										style={{width:120,marginLeft:'22%'}}
										multiLine={false}
										type="time"
										hintText={i18n.__('common.yellForm.time')}
										min={minTime}
										max={maxTime}
									
										/>
							</div>
	</div>
												
					</div>:null}	
			<div style={styles.actions} >
					 <button className="ui fluid circular blue big button" onClick={()=> emitter.emit('backToPlanList') }>
					 	Create 
					 </button>	
					 <div style={styles.divider} id="divider" className="ui  divider"></div>	
					 <div style={styles.backBtnCont} >	
					<button style={styles.backBtn} className="ui fluid circular red basic backBtn mini button" onClick={()=> emitter.emit('backToPlanList') }>
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
