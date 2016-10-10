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
      ipLoc:{}
 	  }

 	}

 	componentDidMount(){
 		emitter.addListener('userLogin',()=> this.setState({userId:Meteor.userId()}) );
 		emitter.addListener('userLogout',()=> this.setState({userId:null}) );

 	}

  componentWillMount () {
      $.getJSON('http://ipinfo.io', (data) =>{
              console.log(data)
              preLoc=data.loc.split(",")
              lat=  parseFloat(preLoc[0])
              lng = parseFloat(preLoc[1])
           
              ipLoc={
                coordinates:[lng,lat],//always stay lng lat
                ipLocAdress:`${data.city} ${data.region} ${data.country}  `
              }
              this.setState({ipLoc})
              //emitter.emit('changeipLoc',ipLoc) // to YellForm
            })


      if (this.state.userId!=null) {

    if(this.props.coords) {
         var lat =this.props.coords.latitude
         var lng =this.props.coords.longitude

         ipLoc={
            coordinates:[lng,lat],
            ipLocAdress:""
         }
         this.setState({ipLoc})
            //emitter.emit('changeipLoc',ipLoc)
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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(MainFragment);
