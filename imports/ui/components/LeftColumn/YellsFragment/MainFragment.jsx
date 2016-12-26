import React, { Component } from 'react';
import AnonFragment from './AnonFragment.jsx'
import UserFragment from './UserFragment.jsx'
import emitter from '../../emitter.js'
import LogInPage from '../../mobile/MainActivity/anon/LogInPage.jsx' 


 class MainFragment extends Component {
 	constructor(props) {
 	  super(props);
 
 	  this.state = {
 	  	userId:Meteor.userId(),
      userCoord:{},
      lang:"en-US"
 	  }

 	}

 	componentDidMount(){

 		emitter.addListener('userLogin',()=> this.setState({userId:Meteor.userId()}));
 		emitter.addListener('userLogout',()=> this.logout());

 	}

  componentWillMount () {
 lang = navigator.language
 console.log(lang)
if (lang=='tr' || lang == 'tr-TR'){
  i18n.setLocale('tr-TR');
} else {
 i18n.setLocale('en-US');
} 
 i18n.getLocale();

  this.setState({lang:lang})
      $.getJSON('http://ipinfo.io', (data) =>{
              console.log(data)
              preLoc=data.loc.split(",")
              lat=  parseFloat(preLoc[0])
              lng = parseFloat(preLoc[1])
              userCoord = [lng,lat];
              emitter.emit('changeLocForMap',userCoord)
               this.setState({userCoord:userCoord})
            })


  if (this.state.userId!=null) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            //console.log(position)
          lat = position.coords.latitude
          lng = position.coords.longitude
          userCoord = [lng,lat];
          emitter.emit('changeLocForMap',userCoord)
          this.setState({userCoord:userCoord})
        });
      } else {
          console.log( "Geolocation is not supported by this browser.")
      } 
  }
  
}

logout(){
    Meteor.logout()
    this.setState({userId:null})
  }

  

	render() {

const {userCoord} = this.state

		return (
			 <div>

			 	{this.state.userId==null ? <AnonFragment />  : <UserFragment userCoord={userCoord} />} 
			 	
			 </div>
		);
	}
}
export default MainFragment;
