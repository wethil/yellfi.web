import React, { Component } from 'react';
import {frameStyle} from '../yells/YellsComponents/constant.js'
import sha1 from 'js-sha1';

 class UserSettings extends Component {

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


	render() {
		const {user} = this.props
		return (
				<div className="ui container" style={frameStyle} >	
					<img src={user.picture} alt="Smiley face" height="42" width="42" />
					 <input className="ui button" id="fileInput" type="file" />
					 <button  onClick={this.uploadPhoto.bind(this)} className="ui primary button"> upload file </button>
					 <div id="fileDisplayArea"></div>
			</div>
		);
	}
}
export default UserSettings;