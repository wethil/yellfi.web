import React from 'react';

const avatarLink = "https://s-media-cache-ak0.pinimg.com/236x/e6/49/c1/e649c1adafad7ca63f6e6e54bc491096.jpg"





const RawNotificationNode = (props) =>{
	const {title,link} = props
				return	(
			<div className="ui centered fluid  card card--z-1" >
			    <div className="content">
			      <img  style={styles.avatar} className="left floated mini ui circular  image" src={avatarLink} />	      
			      <div style={styles.header} className="header">
			        Yelly <span style={{fontSize:9}} > {i18n.__('common.comments.yelly')} </span>
			      </div>
			      <div style={styles.desc} className="description">
						{title}	
			      </div>
			    </div>
			 <a href={link}
			 	target="_blank"  
			 	className="ui bottom attached tiny blue button">
			      <i className="share icon"></i>
			     {i18n.__('common.comments.goSuggestion')}
			    </a>
			  </div>)



						}

export default RawNotificationNode;						

const styles= {
	header:{
		marginLeft: '2.4em',
		color:'#4183c4',
		fontSize: '1em',
    	marginTop:'2%'

	},
	meta:{
		marginLeft: '3.9em',
		fontSize:'0.8em'
	},

	avatar:{
		paddingBottom: '0em !important'
	},
	desc:{
		color:"rgba(30, 27, 27, 0.96)"
	}
}

