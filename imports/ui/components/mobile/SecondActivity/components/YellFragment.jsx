import React, { Component } from 'react';

const YellFragment = (props) => {
	switch (props.dialog){
		case 'comment':
			content ="comment" + props.yell._id
			break;
		case 'joining':
			content ="joining" + props.yell._id
			break;	
	}

	return ( <span> {content} </span> )
}

export default YellFragment;