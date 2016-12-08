import React, { Component } from 'react';
import emitter from '../emitter.js'
import _ from 'lodash'
import {baseYouTubeUrl,
	filmGenres,
	musicGenres,
	baseThemovieDbApiUrl,
	baseBookApiUrl,
	eatDrink,
	foods,
	places,
	basePlacesApiUrl,
	shopping
} from '../constants.js';
import * as foodSourcesList from '../RightColumn/YellForm/FoodDataSource.js'



var $attrib = $('<div id="attributions"></div>');
$('#main').append($attrib);
service = new google.maps.places.PlacesService($attrib[0]);

//This suggestion engine will grow up. It deserve a name. Svenja, yellPanther or etc...
 class SuggestionPawer extends Component {

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
    	if (formattedKeywords.trim()!="") {
    		qWords =formattedKeywords
    	}else {
    		qWords = musicGenres[_.random(0, 163)].title
    	}
	     query = data.title ? ` ${qWords}|${data.title}` :qWords
	      this.handleGet(yellId,plan,baseYouTubeUrl,query)
	        break;
	    case 1:// watching something
	    console.log(chosenIndex)
	   indexx = isNaN(chosenIndex) ?  _.random(18) : chosenIndex
	   console.log(indexx) 
	    	totalPages = chosenIndex!=null ? filmGenres[indexx].totalPages  : 1000 //total page count on theMovieDb
	    	console.log(totalPages)
	    	page = _.random(totalPages)
	    	genre =data.id ? data.id : _.sample(_.map(filmGenres,'id'))
	    	query = `&page=${page}&with_genres=${genre}`
	    	console.log(query)
		    this.handleGet(yellId,plan,baseThemovieDbApiUrl,query)
	        break;
	    case 2://reading something
	    	if (formattedKeywords.trim()!="") {
	    		qWords =formattedKeywords.replace(/ /g, "+") 
	    	}else {
	    		qWords = 'nutuk+atatürk'
	    	}
	        query = `&q=${qWords}`
	        this.handleGet(yellId,plan,baseBookApiUrl,query)
	        break;
	    case 3://eating and dringing
			placeType = data.title ? data.title : _.sample(_.map(eatDrink,'title'))
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(yellId,plan,coord,placeType)
	        break; 
	    case 4: //Cooking
	    	sourceString = data.source ? data.source : _.sample(_.map(foods,'source'))
	    	source = eval(foodSourcesList[sourceString])
	    	this.editSuggestion(yellId,plan,source)
	        break; 
	    case 5: //Going Outside
			placeType = data.title ? data.title : _.sample(_.map(places,'title'))
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(yellId,plan,coord,placeType)
	        break;
	    case 6: //Going to shopping
			placeType = data.title ? data.title : _.sample(_.map(shopping,'title'))
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(yellId,plan,coord,placeType)
	        break; 
	     case 8: //Biking
			placeType = 'bicycle_store'
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(yellId,plan,coord,placeType)
	        break;
	      case 9: //Hiking
			placeType = 'campground'
			 coord = new google.maps.LatLng(suggestionCoord[1],suggestionCoord[0]);
			this.hangleGooglePlacesApi(yellId,plan,coord,placeType)
	        break;                       
	    default:
	        dataSource = [];
	}

}

handleGet(yellId,plan,baseUrl,query){
	
	  $.ajax({
            url: baseUrl+query, 
            type: "GET",   
            dataType: 'jsonp',
            cache: false,
            success: (response) =>{                          
                this.editSuggestion(yellId,plan,response)                
            }           
        });  
}







hangleGooglePlacesApi(yellId,plan,coord,placeType) {
	var request ={
				location : coord,
				type : placeType,
				radius : '500'
			}
	service.nearbySearch(request,(results, status) => {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
 			 this.editSuggestion(yellId,plan,results)  

 		}else {
 			console.log(status)
 		}
	});


}





editSuggestion(yellId,plan,response){
	   suggestions=[]
	 switch(plan) {
		    case 0: //music
		       res = _.sampleSize(response.items,5)
		      res.forEach(function (item) {
		      		obj = {}
		        	obj.id = item.id.videoId 
		        	obj.title = item.snippet.title
		        	suggestions.push(obj)
		        });
		      console.log(suggestions)
		      this.addSuggestionToYell(yellId,suggestions)
		        break;
		    case 1://watch
		    console.log('response')
		    console.log(response)
		    	res = _.sampleSize(response.results,5)
		    	console.log(res)
		    	res.forEach(function (item) {
		    		obj={}
		    		obj.title=item.title
		    		suggestions.push(obj)
		    	});
		          console.log(suggestions)
		      	this.addSuggestionToYell(yellId,suggestions)
		        break;
		     case 2://read
		     res = _.sampleSize(response.items,5)
		     res.forEach(function (item) {
		      		obj = {}
		        	obj.id = item.id
		        	obj.title = item.volumeInfo.title
		        	suggestions.push(obj)
		        });
		     	console.log(suggestions)
		     	 this.addSuggestionToYell(yellId,suggestions)
		        break;
		      case 4 : 
		      	res =_.sampleSize(response, 5)
		      	res.forEach(function (item) {
		      		obj = {}
		        	obj.title = item
		        	suggestions.push(obj)
		      	});
		      	console.log(suggestions)
		       this.addSuggestionToYell(yellId,suggestions)
		       break  
		    default:
		    	res =_.sampleSize(response, 5)
		      	res.forEach(function (item) {
		      		obj = {}
		        	obj.title = item.name
		        	suggestions.push(obj)
		      	});
		      	console.log(suggestions)
		       this.addSuggestionToYell(yellId,suggestions)
		}

}
//0 and 2 has own link, others will redirect to google or otherss

addSuggestionToYell (yellId,suggestions) {
	console.log(yellId)
	console.log(suggestions)

	
		Meteor.call('makeSuggestion', yellId,suggestions,  (error)=> {
		if (error) {
			console.log(error)
		} else {
			console.log('done')
		}
	});

	
}


	render() {
		return (
			<span></span>
		);
	}
}
export default SuggestionPawer;