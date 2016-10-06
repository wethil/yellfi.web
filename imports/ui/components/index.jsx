import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import YellMap from './map/YellMap.jsx'
import LeftColumn from './LeftColumn/LeftColumn.jsx'
import Paper from 'material-ui/Paper';
import RightColumn from './RightColumn/RightColumn.jsx'
import emitter from './emitter.js'


export default class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      ipLoc:{}
    };
  }


	render() {



		return (
 
                <RightColumn />
                
     
		);
	}
}








