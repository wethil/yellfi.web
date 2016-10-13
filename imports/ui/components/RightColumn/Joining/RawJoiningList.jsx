import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';;
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash'
import CustomScroll from 'react-custom-scroll';

 class RawJoiningList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      count:0
    };
  }


 


	render() {
   
    console.log(requerers)
    console.log(request)
    console.log(approved)
    console.log(ownership)


		return (
    <div className="className">joinings</div>
		);
	}
}
export default RawJoiningList;


     const styles = {
        list:{
          backgroundColor:'white'
        },
      username: {
        color: lightBlue900
        },
      plan: {
        color: grey800
        },
      timeDate: {
        color: grey800
        },  
       keywords:{
        fontSize:12
        },
        subhead:{
          fontSize:11,
          color:'#9E9E9E'
        },
        searchIcon:{
          color:'#B71C1C'
        },
        searchRow :{
          marginLeft:'53%'
        },
        listSegment:{
          height:'54vh',
          maxHeight:'84vh'
        }

    }