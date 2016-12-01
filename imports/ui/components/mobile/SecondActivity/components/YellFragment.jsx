import React, { Component } from 'react';
import CommentComposerM from './comments/CommentComposerM.jsx'
import JoiningComposerM from './joining/JoiningComposerM.jsx'


const YellFragment = (props) => {
	blocked = props.userBlocked
	dialog = props.dialog
	if (blocked==false) {
		switch (props.dialog){
			case 'comment':
			
				content = <CommentComposerM 
								yellId={props.yell._id} 
								yellOwnerId={props.yell.ownerId}
								 />
				break;
			
			case 'joining':
				content = <JoiningComposerM  yell={props.yell} />
				break;	
		}
	} else {
		content ="you are blocked "
	}

	return ( <span> {content} </span> )
}

export default YellFragment; //in YelComposer

