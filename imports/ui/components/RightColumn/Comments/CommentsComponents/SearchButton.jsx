import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';

 
 const SearchButton = (props) => {
 	url = props.searchUrl
  	content = props.searchContent
  	iconClass = props.iconClass
 
   return (
 		
  							<FontIcon>
  								 <a href={url+content} target="_blank"> 
  								  <i style={styles.searchIcon}  className={iconClass}></i>
  								  </a>
  							</FontIcon>
  			
 						 	 );

}

 export default SearchButton


 const styles = {
      searchIcon:{
          color:'#B71C1C',
          fontSize:'0.7em'
        }
    }


