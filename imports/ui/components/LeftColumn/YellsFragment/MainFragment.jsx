import React, { Component } from 'react';
import AnonFragment from './AnonFragment.jsx'
import UserFragment from './UserFragment.jsx'
import emitter from '../../emitter.js'
import {geolocated} from 'react-geolocated';


 class MainFragment extends Component {
 	constructor(props) {
 	  super(props);
 
 	  this.state = {
 	  	userId:Meteor.userId(),
      ipLoc:{},
      lang:"en-US"
 	  }

 	}

 	componentDidMount(){

 		emitter.addListener('userLogin',()=> this.setState({userId:Meteor.userId()}) );
 		emitter.addListener('userLogout',()=> this.setState({userId:null}) );

 	}

  componentWillMount () {
 lang = navigator.language
if (lang=='tr' || lang == 'tr-TR'){
  i18n.setLocale('tr-TR');
} else {
 i18n.setLocale('en-US');
} 


  this.setState({lang:lang})
      $.getJSON('http://ipinfo.io', (data) =>{
              console.log(data)
              preLoc=data.loc.split(",")
              lat=  parseFloat(preLoc[0])
              lng = parseFloat(preLoc[1])
           
              ipLoc={
                coordinates:[lng,lat],//always stay lng lat
                ipLocAdress:`${data.city} ${data.region} ${data.country}  `
              }
              emitter.emit('changeLocForMap',ipLoc)
               this.setState({ipLoc:ipLoc})
            })


      if (this.state.userId!=null) {

    if(this.props.coords) {
         var lat =this.props.coords.latitude
         var lng =this.props.coords.longitude

         ipLoc={
            coordinates:[lng,lat],
            ipLocAdress:""
         }
        this.setState({ipLoc:ipLoc})
         emitter.emit('changeLocForMap',ipLoc)
          } else {
            var lat="no lat"
          }
}
  
}

  

	render() {



		return (
			 <div className="className">

			 	{this.state.userId==null ? <AnonFragment ipLoc={this.state.ipLoc} /> : <UserFragment ipLoc={this.state.ipLoc} />} 
			 	
			 </div>
		);
	}
}
export default MainFragment;

geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(MainFragment);
