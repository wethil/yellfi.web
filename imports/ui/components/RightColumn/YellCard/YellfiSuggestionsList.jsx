import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import {plans} from '../../constants.js';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import _ from 'lodash'
import Divider from 'material-ui/Divider';

const YellfiSuggestionsList = (props)=> {
	suggestionList=[]
	switch(props.plan) {
	    case "0":
	        	
	        	props.suggestions.forEach((suggestion) => {
	        		link =`https://www.youtube.com/watch?v=${suggestion.id}`
	        		title = <div style={styles.title}> {_.truncate(suggestion.title, {'length': 50,'separator': ' '})} </div>
	        		suggestionList.push(<a href={link} key={suggestion.id}  target="_blank"> <ListItem 
	        																		style={styles.rootEl} 
			        																innerDivStyle={styles.innerDiv}  
			        																primaryText={title} /></a>)
	        	});
	        break;
	    case "2":
	       
	        	props.suggestions.forEach((suggestion) => {
	        		link =`http://books.google.com.tr/books/reader?id=${suggestion.id}&hl=&printsec=frontcover&output=reader&source=gbs_api`
	        		title = <div style={styles.title}> {suggestion.title} </div>
	        		suggestionList.push(<a href={link} key={suggestion.id} target="_blank"> <ListItem 	
	        																		style={styles.rootEl} 
			        																innerDivStyle={styles.innerDiv}  
			        																primaryText={title} /></a>)
	        	});
	        break;
	    case "1":
	    	
	        	props.suggestions.forEach((suggestion,index) => {
	        		query = suggestion.title.replace(/ /g, "+")
	        		link =`http://www.google.com/search?q=${query}+film`
	        		title = <div style={styles.title}> {suggestion.title} </div>
	        		suggestionList.push(<a href={link} key={index}   target="_blank"> <ListItem  
	        																		style={styles.rootEl} 
			        																innerDivStyle={styles.innerDiv}  
			        																primaryText={title} /></a>)
	        	});
	        break	    
	    default:
	     
	        	props.suggestions.forEach((suggestion,index) => {
	        		query = suggestion.title.replace(/ /g, "+")
	        		link =`http://www.google.com/search?q=${query}`
	        		title = <div style={styles.title}> {suggestion.title} </div>
	        		suggestionList.push(<a href={link}  key={index}  target="_blank"> <ListItem  
	        																		style={styles.rootEl} 
			        																innerDivStyle={styles.innerDiv}  
			        																primaryText={title} /></a>)
	        	});
	}


	return (
	 <Paper style={{boxShadow:'none'}} zDepth={1} >
	  <Divider />
		 <List>
		 	<Subheader style={{fontSize:16,color:'rgba(0, 0, 0, 0.7)'}} >{i18n.__('common.YellCard.suggestionsByYellfi')}</Subheader>
				{suggestionList}
	     </List>
	    </Paper>
	
		)
}

export default YellfiSuggestionsList;


 const styles = {
        title:{
          fontSize:13,
          color:'#757575'
        },
        innerDiv :{
        	zIndex:666,
        	paddingTop:10,
        	paddingBottom:10,
        	paddingLeft:16
        },
        rootEl:{
        	zIndex:777
        }
      	

    }
