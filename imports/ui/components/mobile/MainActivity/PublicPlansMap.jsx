import React, { Component } from 'react';
import MapComposer from './map/MapComposer.jsx'

const PublicPlansMap = (props) => {
	if (props.activeTab==4) {
		return (<div className="ui column" style={{height:'90vh'}} ><MapComposer /></div>)
	} else {
		return ( <div>asd</div> )
	}
}

export default PublicPlansMap;