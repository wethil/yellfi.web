import React, { Component } from 'react';
import LatestYells from './OthersYells/LatestYells.jsx'
import emitter from '../../emitter.js'
import LoadingCircle from './YellsComponents/LoadingCircle.jsx'


 class OthersYells extends Component {
 	constructor(props) {

 	  super(props);
 	
 	  this.state = { limit:10 };
 	}

  componentDidMount(){
     emitter.addListener('incLimit', ()=> { 
        this.incLimit()
    });

  }

   incLimit() {

    this.setState({limit:this.state.limit+5})
  }
 

 	


	render() {
		userCoord=this.props.userCoord
    const {limit} = this.state
		//content = this.state.botNavIndex==0 ?  <LatestYells limit={latestLimit} /> : <NearestYells limit={limit} userCoord={userCoord} />
    content = (userCoord&&userCoord.length>0) ?  <LatestYells limit={limit} userCoord={userCoord} /> : "wait......"

	
		return (
			 <div className="className">	
			 {
        this.props.othersActive?content:""
       }	  
			    
			 </div>	

		);
	}
}
export default OthersYells;


 const styles = {
      drawer: {
        zIndex: 2
        },
      content: {
        fontSize: 11
        },
        fab:{
        	marginLeft:'80%',
        	marginTop:'65%'
        }
    }
