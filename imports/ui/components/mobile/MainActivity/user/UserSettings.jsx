import React, { Component } from 'react';
import {frameStyle} from '../yells/YellsComponents/constant.js'
import sha1 from 'js-sha1';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

 class UserSettings extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	language:0,
 	  	uNameInput:false
 	  };
 	}

 	uploadPhoto(){
 		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');
		var file = fileInput.files[0];
			var imageType = /image.*/;

			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = (e)=> {
					fileDisplayArea.innerHTML = "";

					var img = new Image();
					img.src = reader.result;
				  	this.sendToCDN(reader.result)
					fileDisplayArea.appendChild(img);
				}

				reader.readAsDataURL(file);	
			} else {
				fileDisplayArea.innerHTML = "File not supported!"
			}

 	}


sendToCDN(imageUrl){ 
	var publicId = Meteor.userId()
	//public_id=sample_image&timestamp=1315060510abcd
	var d = new Date();
    var n = d.getTime();
	HTTP.call( 'POST', 'https://api.cloudinary.com/v1_1/dxruacblp/image/upload', {
	  data: {
	  	"timestamp": n,
	  	public_id:publicId,
	    "file":imageUrl,
	    "api_key": "819761397689221",
	    "signature": sha1(`public_id=${publicId}&timestamp=${n}P8LUCpnRemNl2ryYz4Na1BtEVlg`)
	  }
	}, function( error, response ) {
	  if ( error ) {
	    console.log( error );
	  } else {
	    console.log( response );
	   
	  }
	});
}


 changeLang  (event, index, value) {this.setState({language:value})}

 changeUserName(){
 	newName = $("#uNameInput").val();
 	Meteor.call('changeUserName', newName,  (error)=> {
 		if (error) {
 			console.log(error)
 		} else {
 			console.log('ok')
 		}
 	});
 	this.setState({uNameInput:false})
 }

	render() {
		const {user} = this.props
		const {uNameInput} = this.state
		var time = new Date();
		var year = time.getFullYear();
		switch (uNameInput) {
			case false :
				uNameField = <div style={styles.userName} className="ui header"> {user.firstName} </div>
				uNameButton =  <RaisedButton
							      label="Change Visible Name"
							      fullWidth={true}
							      labelPosition="before"
							      onTouchTap={()=> this.setState({uNameInput:true}) }
							      containerElement="label"
						    />
				break;
			case true : 
				uNameField = <TextField id="uNameInput" defaultValue={user.firstName}/>
				uNameButton = <RaisedButton
							      label="Save"
							      fullWidth={true}
							      labelPosition="before"
							      onTouchTap={this.changeUserName.bind(this) }
							      containerElement="label"
						    />	    
		}


		return (
			<div className="ui container" style={frameStyle} >	
				<div className="ui center aligned padded grid">		  
					<div className="row">
						<img src={user.picture} alt="Smiley face" className="ui circular image" width="130" height="130" />
					</div>
				<div className="row" style={{paddingTop:'0em'}} >
						{uNameField}
				</div>		
				
					
						  {uNameButton}
					
						<div className="row" >
						    <RaisedButton
						      label="Choose an Image"
						      labelPosition="before"
						      fullWidth={true}
						      //style={styles.button}
						      containerElement="label"
						    >
						     <input style={styles.ImageInput} accept="image/*" id="fileInput" type="file" />
						
						    </RaisedButton>
						</div>

					<div className="row" style={{padding:'0em'}} >
						  <SelectField
						  		fullWidth={true}
					          floatingLabelText="Dil / Language"
					          value={this.state.language}
					          onChange={this.changeLang.bind(this)}
					        >
					          <MenuItem value={0} primaryText="Türkçe" />
					          <MenuItem value={1} primaryText="English" />
					        </SelectField>
					</div>
					 <RaisedButton
						      label="Logout"
						      labelPosition="before"
						      //style={styles.button}
						      containerElement="label"
						    />
					<div className="row"   >
						<div className="ui header"> yellfi | {year} </div>
					</div>
						
					
				</div>
			</div>
		);
	}
}
export default UserSettings;

const styles = {
	header:{
		fontSize: '4em'
	},
	userName:{
		 //   margin: '0em'
	},
	ImageInput: {
	    cursor: 'pointer',
	    position: 'absolute',
	    top: 0,
	    bottom: 0,
	    right: 0,
	    left: 0,
	    width: '100%',
	    opacity: 0,
  },
}