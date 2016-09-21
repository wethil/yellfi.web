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
  <div className="ui stackable two column grid main_content fixed ">
              <div className="five wide column ">
                <LeftColumn ipLoc={this.state.ipLoc} />
                
              </div>
              <div className="eleven wide column animated fadeIn fixed ">
      
                  <YellMap />

                
                  <button style={styles.button} className="ui button"> button</button>
              </div>
                <RightColumn />
      </div>
		);
	}
}


const styles = {
  button:{
    zIndex:2,
    position:'absolute'
  }
};


  






