export const YouTubeKey="AIzaSyCRpfCBvdHWOvOKlCQwi2UiUaFTgKov2g4"
export const placesApiKey="AIzaSyBnIm4Hg7Uj_jF-eduNHoiSGas-WkNgjg0"
export const themovieDbApi="b362Keyc3224b3d5cfa4479bc451c1f2f26"
export const baseYouTubeUrl =`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YouTubeKey}&type=video&maxResults=50&q=`
export const themovieDbApiUrl= "https://api.themoviedb.org/3/discover/movie"
export const baseThemovieDbApiUrl = `${themovieDbApiUrl}?api_key=${themovieDbApi}&sort_by=popularity.desc&include_adult=false&include_video=false`
export const basePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${placesApiKey}&radius=5000`
//&location=51.503186,-0.126446&type=museum&
export const baseBookApiUrl = 'https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo/title)'
//&q=polisiye romanı&langRestrict=tr

export const plans = [
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
]


export const foods = [
  
{ id:1, title:'Çorba', source:'soups' },
{ id:2, title:'Et Yemekleri', source:'meatFoods'},
{ id:3, title:'Sebze Yemekleri', source:'vegetableFoods'},
{ id:4, title:'Tatlı', source:'desserts'},
{ id:5, title:'Pilav', source:'rices'},
{ id:6, title:'Makarna', source:'macaronis'},
{ id:7, title:'Salata', source:'salads'},
{ id:8, title:'Hamurişi', source:'pasrties'},
{ id:9, title:'Aperatif', source:'snacks'},
{ id:10, title:'İçecekler', source:'drinks'},
{ id:11, title:'Kahvaltılık', source:'breakfasts'},
{ id:12, title:'Mezeler', source:'appetizers'},
{ id:13, title:'Diyet', source:'diets'},
{ id:14, title:'Balık', source:'fishes'},
{ id:15, title:'Kurabiye', source:'cookies'},
{ id:16, title:'Dolma-Sarma', source:'dolmas'},
{ id:17, title:'Bakliyat', source:'legumes'},
{ id:18, title:'Yöreseller', source:'traditionals'},

]


export const ntfTitles = [
  { 'id': 0, "title": 'made a suggestion' },
  { 'id': 1, "title": 'liked your suggestion'},
  { 'id': 2, "title": 'wants to join you for'},
  { 'id': 3, "title": 'approve you to join'}
]



export const musicGenres = [
  {"id":"1","title":"Avant-Garde"},
  {"id":"2","title":"International"},
  {"id":"3","title":"Blues"},
  {"id":"4","title":"Jazz"},
  {"id":"5","title":"Classical"},
  {"id":"6","title":"Novelty"},
  {"id":"7","title":"Comedy"},
  {"id":"8","title":"Old-Time / Historic"},
  {"id":"9","title":"Country"},
  {"id":"10","title":"Pop"},
  {"id":"11","title":"Disco"},
  {"id":"12","title":"Rock"},
  {"id":"13","title":"Easy Listening"},
  {"id":"14","title":"Soul-RnB"},
  {"id":"15","title":"Electronic"},
  {"id":"16","title":"Sound Effects"},
  {"id":"17","title":"Folk"},
  {"id":"18","title":"Soundtrack"},
  {"id":"19","title":"Funk"},
  {"id":"20","title":"Spoken"},
  {"id":"21","title":"Hip-Hop"},
  {"id":"22","title":"Audio Collage"},
  {"id":"25","title":"Punk"},
  {"id":"26","title":"Post-Rock"},
  {"id":"27","title":"Lo-Fi"},
  {"id":"30","title":"Field Recordings"},
  {"id":"31","title":"Metal"},
  {"id":"32","title":"Noise"},
  {"id":"33","title":"Psych-Folk"},
  {"id":"36","title":"Krautrock"},
  {"id":"37","title":"Jazz: Vocal"},
  {"id":"38","title":"Experimental"},
  {"id":"41","title":"Electroacoustic"},
  {"id":"42","title":"Ambient Electronic"},
  {"id":"43","title":"Radio Art"},
  {"id":"45","title":"Loud-Rock"},
  {"id":"46","title":"Latin America"},
  {"id":"47","title":"Drone"},
  {"id":"49","title":"Free-Folk"},
  {"id":"53","title":"Noise-Rock"},
  {"id":"58","title":"Psych-Rock"},
  {"id":"63","title":"Bluegrass"},
  {"id":"64","title":"Electro-Punk"},
  {"id":"65","title":"Radio"},
  {"id":"66","title":"Indie-Rock"},
  {"id":"70","title":"Industrial"},
  {"id":"71","title":"No Wave"},
  {"id":"74","title":"Free-Jazz"},
  {"id":"76","title":"Experimental Pop"},
  {"id":"77","title":"French"},
  {"id":"79","title":"Reggae - Dub"},
  {"id":"81","title":"Afrobeat"},
  {"id":"83","title":"Nerdcore"},
  {"id":"85","title":"Garage"},
  {"id":"86","title":"Indian"},
  {"id":"88","title":"New Wave"},
  {"id":"89","title":"Post-Punk"},
  {"id":"90","title":"Sludge"},
  {"id":"92","title":"African"},
  {"id":"94","title":"Freak-Folk"},
  {"id":"97","title":"Jazz: Out"},
  {"id":"98","title":"Progressive"},
  {"id":"100","title":"Alternative Hip-Hop"},
  {"id":"101","title":"Death-Metal"},
  {"id":"102","title":"Middle East"},
  {"id":"103","title":"Singer-Songwriter"},
  {"id":"107","title":"Ambient"},
  {"id":"109","title":"Hardcore"},
  {"id":"111","title":"Power-Pop"},
  {"id":"113","title":"Space-Rock"},
  {"id":"117","title":"Polka"},
  {"id":"118","title":"Balkan"},
  {"id":"125","title":"Unclassifiable"},
  {"id":"130","title":"Europe"},
  {"id":"137","title":"Americana"},
  {"id":"138","title":"Spoken Weird"},
  {"id":"166","title":"Interview"},
  {"id":"167","title":"Black-Metal"},
  {"id":"169","title":"Rockabilly"},
  {"id":"170","title":"Easy Listening: Vocal"},
  {"id":"171","title":"Brazilian"},
  {"id":"172","title":"Asia-Far East"},
  {"id":"173","title":"N. Indian Traditional"},
  {"id":"174","title":"South Indian Traditional"},
  {"id":"175","title":"Bollywood"},
  {"id":"176","title":"Pacific"},
  {"id":"177","title":"Celtic"},
  {"id":"178","title":"Be-Bop"},
  {"id":"179","title":"Big Band/Swing"},
  {"id":"180","title":"British Folk"},
  {"id":"181","title":"Techno"},
  {"id":"182","title":"House"},
  {"id":"183","title":"Glitch"},
  {"id":"184","title":"Minimal Electronic"},
  {"id":"185","title":"Breakcore - Hard"},
  {"id":"186","title":"Sound Poetry"},
  {"id":"187","title":"20th Century Classical"},
  {"id":"188","title":"Poetry"},
  {"id":"189","title":"Talk Radio"},
  {"id":"214","title":"North African"},
  {"id":"224","title":"Sound Collage"},
  {"id":"232","title":"Flamenco"},
  {"id":"236","title":"IDM"},
  {"id":"240","title":"Chiptune"},
  {"id":"247","title":"Musique Concrete"},
  {"id":"250","title":"Improv"},
  {"id":"267","title":"New Age"},
  {"id":"286","title":"Trip-Hop"},
  {"id":"296","title":"Dance"},
  {"id":"297","title":"Chip Music"},
  {"id":"311","title":"Lounge"},
  {"id":"314","title":"Goth"},
  {"id":"322","title":"Composed Music"},
  {"id":"337","title":"Drum & Bass"},
  {"id":"359","title":"Shoegaze"},
  {"id":"360","title":"Children's Music"},
  {"id":"361","title":"Thrash"},
  {"id":"362","title":"Synth Pop"},
  {"id":"374","title":"Banter"},
  {"id":"377","title":"Deep Funk"},
  {"id":"378","title":"Spoken Word"},
  {"id":"400","title":"Chill-out"},
  {"id":"401","title":"Bigbeat"},
  {"id":"404","title":"Surf"},
  {"id":"428","title":"Radio Theater"},
  {"id":"439","title":"Grindcore"},
  {"id":"440","title":"Rock Opera"},
  {"id":"441","title":"Opera"},
  {"id":"442","title":"Chamber Music"},
  {"id":"443","title":"Choral Music"},
  {"id":"444","title":"Symphony"},
  {"id":"456","title":"Minimalism"},
  {"id":"465","title":"Musical Theater"},
  {"id":"468","title":"Dubstep"},
  {"id":"491","title":"Skweee"},
  {"id":"493","title":"Western Swing"},
  {"id":"495","title":"Downtempo"},
  {"id":"502","title":"Cumbia"},
  {"id":"504","title":"Latin"},
  {"id":"514","title":"Sound Art"},
  {"id":"524","title":"Romany (Gypsy)"},
  {"id":"539","title":"Rap"},
  {"id":"542","title":"Breakbeat"},
  {"id":"567","title":"Gospel"},
  {"id":"580","title":"Abstract Hip-Hop"},
  {"id":"602","title":"Reggae - Dancehall"},
  {"id":"619","title":"Spanish"},
  {"id":"651","title":"Country & Western"},
  {"id":"659","title":"Contemporary Classical"},
  {"id":"693","title":"Wonky"},
  {"id":"695","title":"Jungle"},
  {"id":"741","title":"Klezmer"},
  {"id":"763","title":"Holiday"},
  {"id":"806","title":"hiphop"},
  {"id":"808","title":"Salsa"},
  {"id":"810","title":"Nu-Jazz"},
  {"id":"811","title":"Hip-Hop Beats"},
  {"id":"906","title":"Modern Jazz"},
  {"id":"1032","title":"Turkish"},
  {"id":"1060","title":"Tango"},
  {"id":"1156","title":"Fado"},
  {"id":"1193","title":"Christmas"},
  {"id":"1235","title":"Instrumental"}

]



export const filmGenres = [
  {"id":28,"title":"Action", 'totalPages':950},
  {"id":12,"title":"Adventure",'totalPages':470},
  {"id":16,"title":"Animation",'totalPages':627},
  {"id":35,"title":"Comedy",'totalPages':1000},
  {"id":80,"title":"Crime", 'totalPages':590},
  {"id":99,"title":"Documentary",'totalPages':1000},
  {"id":18,"title":"Drama",'totalPages':3324},
  {"id":10751,"title":"Family",'totalPages':553},
  {"id":14,"title":"Fantasy",'totalPages':310},
  {"id":36,"title":"History",'totalPages':211},
  {"id":27,"title":"Horror",'totalPages':724},
  {"id":10402,"title":"Music",'totalPages':654},
  {"id":9648,"title":"Mystery",'totalPages':296},
  {"id":10749,"title":"Romance",'totalPages':896},
  {"id":878,"title":"Science Fiction",'totalPages':370},
  {"id":10770,"title":"TV Movie",'totalPages':148},
  {"id":53,"title":"Thriller",'totalPages':885},
  {"id":10752,"title":"War",'totalPages':188},
  {"id":37,"title":"Western",'totalPages':192}
]

export const places = [
{"id":1, "title":'accounting'},
{"id":2, "title":'airport'},
{"id":3, "title":'amusement_park'},
{"id":4, "title":'aquarium'},
{"id":5, "title":'art_gallery'},
{"id":6, "title":'atm'},
{"id":7, "title":'bakery'},
{"id":8, "title":'bank'},
{"id":9, "title":'bar'},
{"id":10, "title":'beauty_salon'},
{"id":11, "title":'bicycle_store'},
{"id":12, "title":'book_store'},
{"id":13, "title":'bowling_alley'},
{"id":14, "title":'bus_station'},
{"id":15, "title":'cafe'},
{"id":16, "title":'campground'},
{"id":17, "title":'car_dealer'},
{"id":18, "title":'car_rental'},
{"id":19, "title":'car_repair'},
{"id":20, "title":'car_wash'},
{"id":21, "title":'casino'},
{"id":22, "title":'cemetery'},
{"id":23, "title":'church'},
{"id":24, "title":'city_hall'},
{"id":25, "title":'clothing_store'},
{"id":26, "title":'convenience_store'},
{"id":27, "title":'courthouse'},
{"id":28, "title":'dentist'},
{"id":29, "title":'department_store'},
{"id":30, "title":'doctor'},
{"id":31, "title":'electrician'},
{"id":32, "title":'electronics_store'},
{"id":33, "title":'embassy'},
{"id":34, "title":'finance (deprecated)'},
{"id":35, "title":'fire_station'},
{"id":36, "title":'florist'},
{"id":37, "title":'food (deprecated)'},
{"id":38, "title":'funeral_home'},
{"id":39, "title":'furniture_store'},
{"id":40, "title":'gas_station'},
{"id":41, "title":'gym'},
{"id":42, "title":'hair_care'},
{"id":43, "title":'hardware_store'},
{"id":44, "title":'health (deprecated)'},
{"id":45, "title":'hindu_temple'},
{"id":46, "title":'home_goods_store'},
{"id":47, "title":'hospital'},
{"id":48, "title":'insurance_agency'},
{"id":49, "title":'jewelry_store'},
{"id":50, "title":'laundry'},
{"id":51, "title":'lawyer'},
{"id":52, "title":'library'},
{"id":53, "title":'liquor_store'},
{"id":54, "title":'local_government_office'},
{"id":55, "title":'locksmith'},
{"id":56, "title":'lodging'},
{"id":57, "title":'meal_delivery'},
{"id":58, "title":'meal_takeaway'},
{"id":59, "title":'mosque'},
{"id":60, "title":'movie_rental'},
{"id":61, "title":'movie_theater'},
{"id":62, "title":'moving_company'},
{"id":63, "title":'museum'},
{"id":64, "title":'night_club'},
{"id":65, "title":'painter'},
{"id":66, "title":'park'},
{"id":67, "title":'parking'},
{"id":68, "title":'pet_store'},
{"id":69, "title":'pharmacy'},
{"id":70, "title":'physiotherapist'},
{"id":71, "title":'plumber'},
{"id":72, "title":'police'},
{"id":73, "title":'post_office'},
{"id":74, "title":'real_estate_agency'},
{"id":75, "title":'restaurant'},
{"id":76, "title":'roofing_contractor'},
{"id":77, "title":'rv_park'},
{"id":78, "title":'school'},
{"id":79, "title":'shoe_store'},
{"id":80, "title":'shopping_mall'},
{"id":81, "title":'spa'},
{"id":82, "title":'stadium'},
{"id":83, "title":'storage'},
{"id":84, "title":'store'},
{"id":85, "title":'subway_station'},
{"id":86, "title":'synagogue'},
{"id":87, "title":'taxi_stand'},
{"id":88, "title":'train_station'},
{"id":89, "title":'transit_station'},
{"id":90, "title":'travel_agency'},
{"id":91, "title":'university'},
{"id":92, "title":'veterinary_care'},
{"id":93, "title":'zoo'}

]