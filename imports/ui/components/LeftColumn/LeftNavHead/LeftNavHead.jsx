import React, { Component } from 'react';
 import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
 import IconButton from 'material-ui/IconButton';
 import FontIcon from 'material-ui/FontIcon';
 import IconMenu from 'material-ui/IconMenu';
 import MenuItem from 'material-ui/MenuItem';
import emitter from '../../emitter.js'
import _ from 'lodash'
import {baseYouTubeUrl,
	filmGenres,
	baseThemovieDbApiUrl,
	baseBookApiUrl,
	eatDrink,
	foods,
	places,
	basePlacesApiUrl,
	shopping
} from '../../constants.js'
import * as foodSourcesList from '../../RightColumn/YellForm/FoodDataSource.js'


 var $attrib = $('<div id="attributions"></div>');
$('#main').append($attrib);
 service = new google.maps.places.PlacesService($attrib[0]);

 class LeftNavHead extends Component {

	componentDidMount(){
		emitter.addListener('suggestionToUser',(plan,keywords,data,chosenIndex,yellId,suggestionCoord)=>
				 this.suggestionToUser(plan,keywords,data,chosenIndex,yellId,suggestionCoord)
		);
	}
	suggestionToUser(plan,keywords,data,chosenIndex,yellId,suggestionCoord){
		console.log(plan)
		console.log(data)
		console.log(yellId)
		formattedKeywords = keywords.replace(/ /g, "|")
		console.log(formattedKeywords)
		console.log(chosenIndex + ' chosenIndex ')
		this.getSuggestionsFromCloud(plan,formattedKeywords,data,chosenIndex,yellId,suggestionCoord)
	}

/*

  { id: 0, "content": 'Listening Music', icon: "audiotrack" },
  { id: 1, "content": 'Watching Something', icon: "movie_creation"},
  { id: 2, "content": 'Reading Something', icon:"local_library" },
  { id: 3, "content": 'Eating and Drinking', icon:"restaurant" },
  { id: 4, "content": 'Cooking', icon:"whatshot"  },
  { id: 5, "content": 'Going Outside', icon:"nature_people" },
  { id: 6, "content": 'Going to Shopping', icon:"shopping_cart" },
  { id: 7, "content": 'Hanging out with Someone', icon:"local_cafe" },
  { id: 8, "content": 'Biking', icon:"directions_bike"  },
  { id: 9, "content": 'Hiking', icon:"directions_run" },
  { id: 10, "content": 'Custom', icon:"add" }


*/





getSuggestionsFromCloud(plan,formattedKeywords,data,chosenIndex,yellId,suggestionCoord){
		switch(plan) {
	    case 0://listening music
	     query = data.title ? ` ${formattedKeywords}|${data.title}` :formattedKeywords
	      this.handleGet(plan,baseYouTubeUrl,query)
	        break;
	    case 1:// watching something
	    	totalPages = chosenIndex ? filmGenres[chosenIndex].totalPages  : 1000 //total page count on theMovieDb
	    	page = _.random(totalPages)
	    	genre =data.id ? data.id : _.sample(_.map(filmGenres,'title'))
	    	query = `&page=${page}&with_genres=${genre}`
		    this.handleGet(plan,baseThemovieDbApiUrl,query)
	        break;
	    case 2://reading something
	    	if (formattedKeywords.trim()!="") {
	    		qWords =formattedKeywords.replace(/ /g, "+") 
	    	}else {
	    		qWords = 'nutuk+atatürk'
	    	}
	        query = `&q=${qWords}`
	        this.handleGet(plan,baseBookApiUrl,query)
	        break;
	    case 3://eating and dringing
			placeType = data.title ? data.title : _sample(_.map(eatDrink,'title'))
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			
			this.hangleGooglePlacesApi(plan,coord,placeType)
		
	        break; 
	    case 4: //Cooking
	    	sourceString = data.source ? data.source : _.sample(_.map(foods,'source'))
	    	source = eval(foodSourcesList[sourceString])
	    	suggestions = _.sampleSize(source,5)
	    	console.log(suggestions)
	        break; 
	    case 5: //Going Outside
			placeType = data.title ? data.title : _sample(_.map(places,'title'))
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(plan,coord,placeType)
	        break;
	    case 6: //Going to shopping
			placeType = data.title ? data.title : _sample(_.map(shopping,'title'))
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(plan,coord,placeType)
	        break; 
	     case 8: //Biking
			placeType = 'bicycle_store'
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(plan,coord,placeType)
	        break;
	      case 9: //Hiking
			placeType = 'campground'
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(plan,coord,placeType)
	        break;                       
	    default:
	        dataSource = [];
	}

}

handleGet(plan,baseUrl,query){
	
	  $.ajax({
            url: baseUrl+query, 
            type: "GET",   
            dataType: 'jsonp',
            cache: false,
            success: (response) =>{                          
                this.attachSuggestionsToYell(plan,response)                
            }           
        });  
}







hangleGooglePlacesApi(plan,coord,placeType) {
	var request ={
				location : coord,
				type : placeType,
				radius : '500'
			}
	service.nearbySearch(request,(results, status) => {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
 			 this.attachSuggestionsToYell(plan,results)  

 		}else {
 			console.log(status)
 		}
	});


}





attachSuggestionsToYell(plan,response){
	 switch(plan) {
		    case 0: //music
		         console.log(_.sampleSize(_.map(response.items,'snippet.title'), 5))
		        break;
		    case 1://watch
		        console.log(_.sampleSize(_.map(response.results,'title'), 5))
		        break;
		     case 2://read
		        console.log(_.sampleSize(_.map(response.items,'volumeInfo.title'), 5))
		        break;
		    default:
		        console.log(_.sampleSize(_.map(response,'name'), 5))
		}

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