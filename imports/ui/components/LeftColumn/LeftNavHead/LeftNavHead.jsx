import React, { Component } from 'react';
 import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
 import IconButton from 'material-ui/IconButton';
 import FontIcon from 'material-ui/FontIcon';
 import IconMenu from 'material-ui/IconMenu';
 import MenuItem from 'material-ui/MenuItem';
import emitter from '../../emitter.js'
import {baseYouTubeUrl} from '../../constants.js'

 class LeftNavHead extends Component {

 	componentDidMount(){
			emitter.addListener('suggestionToUser', (plan,keywords,data,yellId)=> this.suggestionToUser(plan,keywords,data,yellId));
		}
	suggestionToUser(plan,keywords,data,yellId){
		console.log(plan)
		console.log(data)
		console.log(yellId)
		formattedKeywords = keywords.replace(/ /g, "|")
		console.log(formattedKeywords)
		 /*&page=1000&with_genres=37
		 $.getJSON(baseYouTubeUrl+formattedKeywords, (response)=> {
				console.log(response)
	        });
		 */
		 
	}


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
					iconButtonElement={
										<IconButton touch={true}>
										<FontIcon className="material-icons">arrow_back</FontIcon>
										</IconButton>
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