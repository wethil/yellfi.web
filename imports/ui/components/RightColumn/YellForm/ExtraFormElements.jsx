import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import emitter from '../../emitter.js'

export default class ExtraFormElements extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	publicOpt:{}

	  };
	}
	componentDidMount() {
	var input = document.getElementById('places');
	var autocomplete = new google.maps.places.Autocomplete(input);
	google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
			var place = autocomplete.getPlace();
			myLatLng = place.geometry.location
			var lat = myLatLng.lat();
			var lng = myLatLng.lng();
			this.setState({
			publicOpt:{
					lat:lat,
					lng:lng,
					place:place.place_id,
					placeAdress:place.formatted_address
				}
			})

			
			emitter.emit('changePublicOpt',this.state.publicOpt) // to YellForm.jsx
			

			});

}
	render() {
		return (
			<div>
				<TextField //location autocomplete
							multiLine={true}
							rowsMax={3}
			                onChange={this.handlePlaceChange}
			                id="places"
			                  />
			     <p style={styles.labelStyle}> *Selected place will occur on map </p>             
				<div  style={styles.dateTime} className="ui two column grid ">
	                <div className="column">
	                   <DatePicker
	                   onChange={ (e,date)=> emitter.emit('changeDate',date) } // to YellForm.jsx
	                   textFieldStyle={{width :115}}
	                   minDate = { new Date()}
	                   hintText="Date" />
	                </div>
	                <div className="column">
	                      <TimePicker
	                         onChange={ (e,time)=> emitter.emit('changeTime',time) } // to YellForm.jsx
	                       textFieldStyle={	{width:115}}
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
		      }
		};