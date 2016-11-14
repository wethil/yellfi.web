import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import {plans} from '../../constants.js';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

const YellfiSuggestionsList = (props)=> {
	return (
	 <Paper style={{boxShadow:'none'}} zDepth={1} >
		 <List>
		 <Subheader>Suggestions By Yellfi</Subheader>
	      <ListItem primaryText="Inbox" leftIcon={<FontIcon className="material-icons">audiotrack</FontIcon>} />
	      <ListItem primaryText="Starred" leftIcon={<FontIcon className="material-icons">audiotrack</FontIcon>} />
	      <ListItem primaryText="Sent mail" leftIcon={<FontIcon className="material-icons">audiotrack</FontIcon>} />
	      <ListItem primaryText="Drafts" leftIcon={<FontIcon className="material-icons">audiotrack</FontIcon>} />
	      <ListItem primaryText="Inbox" leftIcon={<FontIcon className="material-icons">audiotrack</FontIcon>} />
	    </List>
	    </Paper>
	
		)
}

export default YellfiSuggestionsList;