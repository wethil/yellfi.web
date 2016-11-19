 import React, { Component } from 'react';
 import CircularProgress from 'material-ui/CircularProgress';
 const LoadingCircle = () => (
	<div 
		className="ui  center aligned basic segment" 
		style={{height:'54.6vh',marginRight:0,backgroundColor:'#ffffff'}}> 

		<div style={{marginTop:'19%'}}>
			<CircularProgress  />
		</div>
	</div>

						 	 );

 export default LoadingCircle