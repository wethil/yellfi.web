export const YouTubeKey="AIzaSyCRpfCBvdHWOvOKlCQwi2UiUaFTgKov2g4"
export const placesApiKey="AIzaSyBnIm4Hg7Uj_jF-eduNHoiSGas-WkNgjg0"
export const themovieDbApi="b362c3224b3d5cfa4479bc451c1f2f26"
export const baseYouTubeUrl =`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YouTubeKey}&type=video&maxResults=50&q=`
export const themovieDbApiUrl= "https://api.themoviedb.org/3/discover/movie"
export const baseThemovieDbApiUrl = `${themovieDbApiUrl}?api_key=${themovieDbApi}&sort_by=popularity.desc&include_adult=false`
//  &page=1&with_genres=37 
export const basePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${placesApiKey}&radius=5000`
//&location=51.503186,-0.126446&type=museum&
export const baseBookApiUrl = 'https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo/title)&maxResults=40'
//&q=polisiye romanı&langRestrict=tr

export const mailAddress = "fdogru@yellfi.com"
export const fbShareLink = "https://atmospherejs.com/packages/trending"
export const twtrShareLink = "https://twitter.com/intent/tweet?text=Hello%20world"

export const plans = [
  { id: 0, content: 'common.plans.ListeningMusic', icon: "audiotrack" },
  { id: 1, content: 'common.plans.WatchSomething', icon: "movie_creation"},
  { id: 2, content: 'common.plans.ReadSomething', icon:"local_library" },
  { id: 3, content: 'common.plans.EatAndDrink', icon:"restaurant" },
  { id: 4, content: 'common.plans.Cooking', icon:"whatshot"  },
  { id: 5, content: 'common.plans.GoinOutside', icon:"nature_people" },
  { id: 6, content: 'common.plans.GoinShopping', icon:"shopping_cart" },
  { id: 7, content: 'common.plans.HanginOutSomeone', icon:"local_cafe" },
  { id: 8, content: 'common.plans.Biking', icon:"directions_bike"  },
  { id: 9, content: 'common.plans.Hiking', icon:"directions_run" },
  { id: 10,content:'common.plans.Custom', icon:"add" }
]



export const foods = [
  
{ "id":1, "title":"Çorba", "source":"soups" },
{ "id":2, "title":"Et Yemekleri", "source":"meatFoods"},
{ "id":3, "title":"Sebze Yemekleri", "source":"vegetableFoods"},
{ "id":4, "title":"Tatlı", "source":"desserts"},
{ "id":5, "title":"Pilav", "source":"rices"},
{ "id":6, "title":"Makarna", "source":"macaronis"},
{ "id":7, "title":"Salata", "source":"salads"},
{ "id":8, "title":"Hamurişi", "source":"pastries"},
{ "id":9, "title":"Aperatif", "source":"snacks"},
{ "id":10, "title":"İçecekler", "source":"drinks"},
{ "id":11, "title":"Kahvaltılık", "source":"breakfasts"},
{ "id":12, "title":"Mezeler", "source":"appetizers"},
{ "id":13, "title":"Diyet", "source":"diets"},
{ "id":14, "title":"Balık", "source":"fishes"},
{ "id":15, "title":"Kurabiye", "source":"cookies"},
{ "id":16, "title":"Dolma-Sarma", "source":"dolmas"},
{ "id":17, "title":"Bakliyat", "source":"legumes"},
{ "id":18, "title":"Yöreseller", "source":"traditionals"},

]


export const ntfTitles = [
  { 'id': 0, "content": 'common.ntfContent.madeSug' },
  { 'id': 1, "content": 'common.ntfContent.liked'},
  { 'id': 2, "content": 'common.ntfContent.reqJoin'},
  { 'id': 3, "content": 'common.ntfContent.appJoin'}
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
  {"id":28,"title":"Action", "totalPages":950},
  {"id":12,"title":"Adventure","totalPages":470},
  {"id":16,"title":"Animation","totalPages":627},
  {"id":35,"title":"Comedy","totalPages":1000},
  {"id":80,"title":"Crime", "totalPages":590},
  {"id":99,"title":"Documentary","totalPages":1000},
  {"id":18,"title":"Drama","totalPages":1000},
  {"id":10751,"title":"Family","totalPages":553},
  {"id":14,"title":"Fantasy","totalPages":310},
  {"id":36,"title":"History","totalPages":211},
  {"id":27,"title":"Horror","totalPages":724},
  {"id":10402,"title":"Music","totalPages":654},
  {"id":9648,"title":"Mystery","totalPages":296},
  {"id":10749,"title":"Romance","totalPages":896},
  {"id":878,"title":"Science Fiction","totalPages":370},
  {"id":10770,"title":"TV Movie","totalPages":148},
  {"id":53,"title":"Thriller","totalPages":885},
  {"id":10752,"title":"War","totalPages":188},
  {"id":37,"title":"Western","totalPages":192}
]

export const placesEng =[
  {"id":3,"title":"amusement_park","value":"Amusement park"},
  {"id":4,"title":"aquarium","value":"Aquarium"},
  {"id":7,"title":"bakery","value":"Bakery"},
  {"id":10,"title":"beauty_salon","value":"Beauty salon"},
  {"id":14,"title":"bus_station","value":"Bus station"},
  {"id":16,"title":"campground","value":"Campground"},
  {"id":21,"title":"casino","value":"Casino"},
  {"id":36,"title":"florist","value":"Florist"},
  {"id":41,"title":"gym","value":"Gym"},
  {"id":42,"title":"hair_care","value":"Hair care"},
  {"id":45,"title":"hindu_temple","value":"Hindu temple"},
  {"id":52,"title":"library","value":"Library"},
  {"id":56,"title":"lodging","value":"Lodging"},
  {"id":61,"title":"movie_theater","value":"Movie theater"},
  {"id":63,"title":"museum","value":"Museum"},
  {"id":66,"title":"park","value":"Park"},
  {"id":81,"title":"spa","value":"Spa"},
  {"id":82,"title":"stadium","value":"Stadium"},
  {"id":85,"title":"subway_station","value":"Subway station"},
  {"id":91,"title":"university","value":"University"},
  {"id":93,"title":"zoo","value":"Zoo"}
]

export const placesTr=[
  {"id":3,"title":"amusement_park","value":"Eğlence Parkı"},
  {"id":4,"title":"aquarium","value":"Akvaryum"},
  {"id":7,"title":"bakery","value":"Fırın-Börekçi"},
  {"id":10,"title":"beauty_salon","value":"Güzellik Salonu"},
  {"id":14,"title":"bus_station","value":"Otobüs istasyonu"},
  {"id":16,"title":"campground","value":"Kamp alanı"},
  {"id":21,"title":"casino","value":"Gazino"},
  {"id":36,"title":"florist","value":"Çiçekçi"},
  {"id":41,"title":"gym","value":"Gym"},
  {"id":42,"title":"hair_care","value":"Saç Bakım Merkezi"},
  {"id":45,"title":"hindu_temple","value":"Hindu tapınağı"},
  {"id":52,"title":"library","value":"Kütüphane"},
  {"id":56,"title":"lodging","value":"Kalacak Yer"},
  {"id":61,"title":"movie_theater","value":"Sinema"},
  {"id":63,"title":"museum","value":"Müze"},
  {"id":66,"title":"park","value":"Park"},
  {"id":81,"title":"spa","value":"Spa"},
  {"id":82,"title":"stadium","value":"Stadyum"},
  {"id":85,"title":"subway_station","value":"Metro Durağı"},
  {"id":91,"title":"university","value":"Üniversite"},
  {"id":93,"title":"zoo","value":"Hayvanat Bahçesi"}
]






export const eatDrinkEng = [
  {"id":1,"title":"cafe","value":"Cafe"},
  {"id":9,"title":"bar","value":"Bar"},
  {"id":2,"title":"restaurant","value":"Restaurant"},
  {"id":3,"title":"night_club","value":"Night club"},
  {"id":4,"title":"liquor_store","value":"Liquor store"},
  {"id":57,"title":"meal_delivery","value":"Meal delivery"},
  {"id":58,"title":"meal_takeaway","value":"Meal takeaway"}
]

export const eatDrinkTr =[
  {"id":1,"title":"cafe","value":"Cafe"},
  {"id":9,"title":"bar","value":"Bar"},
  {"id":2,"title":"restaurant","value":"Restaurant"},
  {"id":3,"title":"night_club","value":"Night club"},
  {"id":4,"title":"liquor_store","value":"Liquor store"},
  {"id":57,"title":"meal_delivery","value":"Meal delivery"},
  {"id":58,"title":"meal_takeaway","value":"Meal takeaway"}
]



export const shoppingEng= [
  {"id":5,"title":"art_gallery","value":"Art gallery"},
  {"id":7,"title":"bakery","value":"Bakery"},
  {"id":84,"title":"store","value":"Store"},
  {"id":12,"title":"book_store","value":"Book store"},
  {"id":17,"title":"car_dealer","value":"Car dealer"},
  {"id":18,"title":"car_rental","value":"Car rental"},
  {"id":49,"title":"jewelry_store","value":"Jewelry store"},
  {"id":11,"title":"bicycle_store","value":"Bicycle store"},
  {"id":25,"title":"clothing_store","value":"Clothing store"},
  {"id":26,"title":"convenience_store","value":"Convenience store"},
  {"id":29,"title":"department_store","value":"Department store"},
  {"id":32,"title":"electronics_store","value":"Electronics store"},
  {"id":39,"title":"furniture_store","value":"Furniture store"},
  {"id":43,"title":"hardware_store","value":"Hardware store"},
  {"id":46,"title":"home_goods_store","value":"Home goods store"},
  {"id":53,"title":"liquor_store","value":"Liquor store"},
  {"id":60,"title":"movie_rental","value":"Movie rental"},
  {"id":69,"title":"pharmacy","value":"Pharmacy"},
  {"id":80,"title":"shopping_mall","value":"Shopping mall"},
  {"id":79,"title":"shoe_store","value":"Shoe store"},
  {"id":68,"title":"pet_store","value":"Pet store"}
]


export  const shoppingTr= [
  {"id":5,"title":"art_gallery","value":"Sanat Galerisi"},
  {"id":7,"title":"bakery","value":"Fırın-Börekçi"},
  {"id":84,"title":"store","value":"Mağaza"},
  {"id":12,"title":"book_store","value":"Kitapçı"},
  {"id":17,"title":"car_dealer","value":"Araba galerisi"},
  {"id":18,"title":"car_rental","value":"Araba Kiralama"},
  {"id":49,"title":"jewelry_store","value":"Kuyumcu"},
  {"id":11,"title":"bicycle_store","value":"Bisikletçi"},
  {"id":25,"title":"clothing_store","value":"Elbise Mağazası"},
  {"id":26,"title":"convenience_store","value":"Market"},
  {"id":29,"title":"department_store","value":"Büyük Mağaza"},
  {"id":32,"title":"electronics_store","value":"Elektronik Mağazası"},
  {"id":39,"title":"furniture_store","value":"Mobilya Mağazası"},
  {"id":43,"title":"hardware_store","value":"Donanım Mağazası"},
  {"id":46,"title":"home_goods_store","value":"Ev aletleri"},
  {"id":53,"title":"liquor_store","value":"Likör bayi"},
  {"id":60,"title":"movie_rental","value":"Film kiralama"},
  {"id":69,"title":"pharmacy","value":"Eczane"},
  {"id":80,"title":"shopping_mall","value":"AVM"},
  {"id":79,"title":"shoe_store","value":"Ayakkabı Mağazası"},
  {"id":68,"title":"pet_store","value":"Petshop"}
];

  export const planCardStyles = {
        list:{
          height: '80.6vh',
          backgroundColor:'white'
        },
      header: {
        marginLeft: '2.4em',
          marginTop:'0.3em',
          color:'rgb(65, 131, 196)'  //'#4183c4'
        },
      meta: {
        fontWeight:100
        //marginLeft: '3.9em',
        //fontSize:'0.8em'
        },
      timeDate: {
        color:'#424242'
        },  
       keywords:{
        fontSize:12
        },
        avatar:{
          paddingBottom: '0em !important'
        },
        desc:{
          fontWeight:'bolder',
          fontSize: 16
        },
        buttons:{
          padding : '0.78571429em 1em 0.78571429em 1em'
        }

    };


  export const  listsDesktopStyles = {
      list:{
        height: '84.6vh',
        backgroundColor:'white'
      },
       username: {
        color: '#01579B'
      },
      plan: {
       color: '#424242'
      },
      timeDate: {
       color: '#424242'
      },  
      keywords:{
        fontSize:12
      },
      subhead:{
        fontSize:11,
        color:'#9E9E9E'
      },
      planTxt:{
        fontSize:'1.2em',
        color:'#212121'
      }

    };

    //desktop Empty State Style
    export const  dees =  {
      icon: {
        fontSize: 129,
        color:'#2196f3'
        },
        subhead:{
          color:'#616161'
        },
       content:{
        color:'#424242'
       }
    };

 export const userSettingsStyles = {
  header:{
    fontSize: '4em'
  },
  userName:{
     //   margin: '0em'
  },
  ImageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
  },
    badgeInLine:{
      bottom:18,
      cursor:'pointer',
      right:21,
      top:'initial',
      backgroundColor:'#3F51B5'
  },
   avatarBadge:{
    color :'#ffffff',
    fontSize:13
  },
  editIcon:{
    zIndex:888,
    marginLeft:-9,
    fontSize:20
  },
  editButton:{
    zIndex:999,
    marginTop:-12,
    padding:'0px !important',
    height:'20px !important'
  }
}