import React, { Component } from 'react';
import RawNotificationNode from './RawNotificationNode.jsx'
import _ from 'lodash'


const YellfiSuggestionsList = (props)=> {
	suggestionList=[]
	switch(props.plan) {
	    case "0":
	        	
	        	props.suggestions.forEach((suggestion,index) => {
	        		link =`https://www.youtube.com/watch?v=${suggestion.id}`
	        		title =  _.truncate(suggestion.title, {'length': 50,'separator': ' '})
	        		suggestionList.push(<RawNotificationNode key={index}  link={link} title={title} />)

	        	});
	        break;
	    case "2":
	       
	        	props.suggestions.forEach((suggestion,index) => {
	        		link =`http://books.google.com.tr/books/reader?id=${suggestion.id}&hl=&printsec=frontcover&output=reader&source=gbs_api`
	        		title = suggestion.title
	        		suggestionList.push(<RawNotificationNode key={index}  link={link} title={title} />)
	        	});
	        break;
	    case "1":
	    	
	        	props.suggestions.forEach((suggestion,index) => {
	        		query = suggestion.title.replace(/ /g, "+")
	        		link =`http://www.google.com/search?q=${query}+film`
	        		title = suggestion.title
	        		suggestionList.push(<RawNotificationNode key={index}  link={link} title={title} />)
	        	});
	        break	    
	    default:
	     
	        	props.suggestions.forEach((suggestion,index) => {
	        		query = suggestion.title.replace(/ /g, "+")
	        		link =`http://www.google.com/search?q=${query}`
	        		title = suggestion.title
	        		suggestionList.push(<RawNotificationNode key={index}  link={link} title={title} />)
	        	});
	}


	return (<div>{suggestionList}</div>)
}

export default YellfiSuggestionsList;

