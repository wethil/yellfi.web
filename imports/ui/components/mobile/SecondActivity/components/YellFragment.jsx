import React, { Component } from 'react';
import CommentComposerM from './comments/CommentComposerM.jsx'
import JoiningComposerM from './joining/JoiningComposerM.jsx'

const YellFragment = (props) => {
	
	switch (props.dialog){
		case 'comment':
			content = <CommentComposerM 
							yellId={props.yell._id} 
							yellOwnerId={props.yell.ownerId} />
			break;
		case 'joining':
			content = <JoiningComposerM yellId={props.yell._id}
										ownerId={props.yell.ownerId} 
										requests={props.yell.requests} 
										approved ={props.yell.approved}
										publicity={props.yell.publicity} />
			break;	
	}

	return ( <span> {content} </span> )
}

export default YellFragment;

