import React, { Component } from 'react';
import LoggedInUserFragment from './LoggedInUserFragment.jsx'
import emitter from './emitter.js' //main emitter
import Login from '../LeftColumn/Accounts/Login.jsx'
import Register from '../LeftColumn/Accounts/Register.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AnonUserFragment from './AnonUserFragment.jsx'


 class Index extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	userCoord:[-88.175354,39.480200], //eieieiu
 	    userId:Meteor.userId()
    };
 	}

 	componentDidMount(){
    emitter.addListener('userLogin',()=> this.setState({userId:Meteor.userId()}) ); //from login jsx
 	   emitter.addListener('logout',()=> this.logout() );
  }

  logout(){
    Meteor.logout()
    this.setState({userId:null})
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
//<AnonUserFragment  coordinates={userCoord} /> 

	render() {
		const {userCoord,userId} = this.state

		return (
		
				<span>	
        {userId==null ? <AnonUserFragment coordinates={userCoord}  />: <LoggedInUserFragment  coordinates={userCoord} />} 
				</span>		
			 
		);
	}
}
export default Index;
