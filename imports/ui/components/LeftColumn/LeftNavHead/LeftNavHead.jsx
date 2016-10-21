import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { Session } from 'meteor/session'
import emitter from '../../emitter.js'

const style = {
    backgroundColor: '#3f51b5'
};


 class LeftNavHead extends Component {
	render() {
		return (
			  <AppBar style={style}
				    title="yellfi"
				    zDepth={0}
				    iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
				  
				  />
		);
	}
}
export default LeftNavHead;