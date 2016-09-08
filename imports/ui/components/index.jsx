import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import YellMap from './map/YellMap.jsx'
import LeftColumn from './LeftColumn/LeftColumn.jsx'
import Paper from 'material-ui/Paper';
import RightColumn from './RightColumn/RightColumn.jsx'


export default class Index extends Component {
	render() {
		return (
  <div className="ui stackable two column grid main_content fixed ">
              <div className="five wide column ">
                <LeftColumn />
                
              </div>
              <div className="eleven wide column animated fadeIn fixed ">
      
                  <YellMap />

                
                  <button  className="ui button"> button</button>
              </div>
                <RightColumn />
      </div>
		);
	}
}


const paper = {
   height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }