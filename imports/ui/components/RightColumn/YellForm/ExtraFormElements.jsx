import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import emitter from '../../emitter.js'

export default class ExtraFormElements extends Component {

	componentDidMount() {
	var input = document.getElementById('places');
	var autocomplete = new google.maps.places.Autocomplete(input);
	google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
			var place = autocomplete.getPlace();
			//console.log(place)
			myLatLng = place.geometry.location
			var lat = myLatLng.lat();
			var lng = myLatLng.lng();
			publicGeoLoc={
					coordinates:[lng,lat],
					geoLocAdress:place.formatted_address
				}
		

			
			emitter.emit('changepublicGeoLoc',publicGeoLoc) // to YellForm.jsx
			

			});
	$("#places").attr("placeholder", "Write a Place to occur on map").val("").focus().blur();

}
	render() {
		return (
			<div>
				<TextField //location autocomplete
					inputStyle={{ fontSize: 13 }}
					id="places"
					/>


				<div  style={styles.dateTime} className="ui two column grid ">
					<div className="column">
						<DatePicker
							onChange={ (e, date) => emitter.emit('changeDate', date) } // to YellForm.jsx
							textFieldStyle={styles.dateTimeForm}
							minDate = { new Date() }
							hintText="Date" />
					</div>
					<div className="column">
						<TimePicker
							onChange={ (e, time) => emitter.emit('changeTime', time) } // to YellForm.jsx
							textFieldStyle={styles.dateTimeForm}
							format="24hr"
							hintText="Time"
							/>
					</div>
				</div>
			</div>
		);
	}
}


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
		      }
		};


		