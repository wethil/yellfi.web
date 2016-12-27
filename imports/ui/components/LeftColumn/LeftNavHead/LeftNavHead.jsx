import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory } from 'react-router'

 class LeftNavHead extends Component {




	render() {


		return (
			<Toolbar style={styles.toolbar} >
				<ToolbarGroup firstChild={false}>
					<IconButton onTouchTap={()=> browserHistory.push('/y/main')} iconStyle={styles.toolbarIcon}>
						<FontIcon  className="material-icons">dehaze</FontIcon>
					</IconButton>
				<ToolbarTitle style={styles.toolbarTitle} text="yellfi" />
			</ToolbarGroup>
			</Toolbar>

		);
	}
}
export default LeftNavHead;



      //<IconButton><NavigationMenu /></IconButton>

     
 const styles = {
        toolbar:{
      		 backgroundColor: '#3f51b5'
        },
        toolbarIcon:{
        	color:'white'
        },
        toolbarTitle: {
        	color:'white',
        	lineHeight:'46px'
        }
      
    }