import React, { Component } from 'react';
import Navbar from './Navbar.jsx'
import MainActivity from './MainActivity/MainActivity.jsx'

 class Index extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	userCoord:[-88.175354,39.480200] //eieieiu
 	  };
 	}

 	componentDidMount(){
 		moment.locale('tr')
 	}

 	componentWillMount(){

 		   $.getJSON('http://ipinfo.io', (data) =>{
              console.log(data)
              preLoc=data.loc.split(",")
              lat=  parseFloat(preLoc[0])
              lng = parseFloat(preLoc[1])
              coordinates = [lng,lat];//always stay lng lat
              //ipLocAdress:`${data.city} ${data.region} ${data.country} `
               this.setState({userCoord:coordinates})
            })




 	}


	render() {
		const {userCoord} = this.state

		return (
				<div>
						<Navbar  coordinates={userCoord} />
						
				</div>
		);
	}
}
export default Index;



/*
add geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     console.log( "Geolocation is not supported by this browser.")
    }

function showPosition(position) {
    console.log(position)
}


*/