import React, { Component } from 'react';
import {frameStyle} from '../yells/YellsComponents/constant.js'
import sha1 from 'js-sha1';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';
import i18n from 'meteor/universe:i18n';
import emitter from '../../emitter.js'
import { browserHistory } from 'react-router'
 class UserSettings extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	language:i18n.getLocale(),
 	  	uNameInput:false,
 	  	uploadButtonLabel:"add_a_photo"
 	  };
 	}
componentWillMount(){
	var lang = i18n.getLocale()
	if (lang=="tr" || lang== "tr-TR") {
		this.setState({language:"tr-TR"})
	} else {
		this.setState({language:"en-US"})
	}
}
 
 	clickBadge(){
 		$("#fileInput").trigger("click");
 	}

 	uploadPhoto(){
 		this.setState({uploadButtonLabel:"watch_later"})
 		var fileInput = document.getElementById('fileInput');
		var file = fileInput.files[0];
			var imageType = /image.*/;

			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = (e)=> {
				

					var img = new Image();
					img.src = reader.result;
				  	this.sendToCDN(reader.result)
				
				}

				reader.readAsDataURL(file);	
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
	}, ( error, response )=> {
	  if ( error ) {
	    console.log( error );
	  } else {
	    console.log( response );
	    this.changeUserPic(response.data)
	   
	  }
	});
}


changeUserPic(data){
	imageUrl = data.secure_url
	 Meteor.call('changeUserPic', imageUrl,  (error)=> {
 		if (error) {
 			console.log(error)
 		} else {
 			console.log('ok')
 		}
 	});
 	this.setState({uploadButtonLabel:"add_a_photo"})
}


 changeLang  (event, index, value) {
	moment.locale(value);
	i18n.setLocale(value).then(()=>{
		this.setState({language:value});
	})	
	$('#clickAny').removeClass('hidden')

 	}

CUNSubmit(e){
	e.preventDefault()
	if (e.key == 'Enter') {
 		this.changeUserName()
	}
}

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

 logout(){
 	 	emitter.emit('logout')
 }



	render() {
		const {user} = this.props
		const {uNameInput,uploadButtonLabel} = this.state
		var time = new Date();
		var year = time.getFullYear();
		switch (uNameInput) {
			case false :
				uNameField = 
									<div style={styles.userName} className="ui header"> {user.firstName} 
									  <IconButton
									  	 onTouchTap={()=> this.setState({uNameInput:true}) }
									      iconClassName="material-icons"
									      iconStyle={styles.editIcon}
									      style={styles.editButton}
									    >
									      edit
									    </IconButton>
							</div>	
				uNameButton = null
				break;
			case true : 
				uNameField = <TextField id="uNameInput" onKeyUp={this.CUNSubmit.bind(this)} defaultValue={user.firstName}/>
				uNameButton = <RaisedButton
							      label={i18n.__('common.userSett.save')}
							      fullWidth={true}
							      labelPosition="before"
							      onTouchTap={this.changeUserName.bind(this) }
							      containerElement="label"
						    />	    
		}


		return (
			<div className="ui container" style={frameStyle} >	
				<div className="ui center aligned padded grid">		  
					<div className="row"  style={{padding:'0em'}} >
							<Badge
								onTouchTap={this.clickBadge.bind(this)}
								badgeContent={
									<FontIcon   style={styles.avatarBadge} 
												className="material-icons">{uploadButtonLabel}
									</FontIcon>
								}
								primary={true}
								badgeStyle={styles.badgeInLine}

								>
									<Avatar //onTouchTap={this.clickBadge.bind(this)}
											 style={{cursor:'pointer'}} src={user.picture} size={80}/>
								</Badge> 
					</div>
				<div className="row" style={{paddingTop:'0em'}} >
					{uNameField}
				</div>		
				
					
						  {uNameButton} 
					
						     <input style={styles.ImageInput} 
						     		accept="image/*" 
						     		id="fileInput" 
						     		type="file"
						     		onChange={this.uploadPhoto.bind(this)} />
					
						
						

					<div className="row"  >
						  <SelectField
							  //style={{zIndex:999}}
							  //labelStyle={{zIndex:888}}
							  //hintStyle={{zIndex:777}}
						  	fullWidth={true}
						  	//floatingLabelStyle={{zIndex:666}}
						  	//hintStyle={{zIndex:555}}
						  	//listStyle={{zIndex:444}}
						  	//menuStyle={{zIndex:333}}
						  	//underlineStyle={{zIndex:222}}
					          floatingLabelText="Dil / Language"
					          value={this.state.language}
					          onChange={this.changeLang.bind(this)}
					        >
					          <MenuItem value='tr-TR' primaryText="Türkçe" />
					          <MenuItem value='en-US' primaryText="English" />
					        </SelectField>
					</div>
				<div id="clickAny" className="row hidden" style={{padding:'0em'}} >
					<h5> {i18n.__('common.userSett.clickAnyWhere')} </h5>
				</div>	
					<br/>
					<a href="#" onClick={this.logout.bind(this)} style={{color:'#F44336'}} >{i18n.__('common.userSett.logout')}</a>
					<br/>
					<div className="row" style={{paddingBottom:'0em'}} >
						  <a  href="#">{i18n.__('common.userSett.clickToEmail')} : support@yellfi.com</a>
					</div>
						<h5> yellfi | {year} </h5>
					
						
					
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
    badgeInLine:{
	  	bottom:18,
	  	cursor:'pointer',
	  	right:21,
	  	top:'initial',
	  	backgroundColor:'#3F51B5'
  },
   avatarBadge:{
  	color :'#ffffff',
  	fontSize:13
  },
  editIcon:{
  	zIndex:888,
  	marginLeft:-9,
  	fontSize:20
  },
  editButton:{
  	zIndex:999,
  	marginTop:-12,
  	padding:'0px !important',
  	height:'20px !important'
  }
}