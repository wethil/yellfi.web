import React, { Component } from 'react';
 import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
 import IconButton from 'material-ui/IconButton';
 import FontIcon from 'material-ui/FontIcon';
 import IconMenu from 'material-ui/IconMenu';
 import MenuItem from 'material-ui/MenuItem';
import MediaQuery from 'react-responsive'
import emitter from '../../emitter.js'


 class LeftNavHead extends Component {




	render() {


		return (
			<Toolbar style={styles.toolbar} >
				<ToolbarGroup firstChild={false}>
					<IconButton iconStyle={styles.toolbarIcon}>
						<FontIcon  className="material-icons">dehaze</FontIcon>
					</IconButton>
				<ToolbarTitle style={styles.toolbarTitle} text="yellfi" />
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarSeparator />

				<IconMenu
					iconButtonElement={<MediaQuery query='(max-width: 767px)'>
										<IconButton touch={true}>
										<FontIcon className="material-icons">arrow_back</FontIcon>
										</IconButton>
									</MediaQuery>	
										 }>
					<MenuItem primaryText="Download" />
					<MenuItem primaryText="More Info" />
				</IconMenu>
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