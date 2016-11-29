import React, { Component } from 'react';
import CommentComposerM from './comments/CommentComposerM.jsx'

const YellFragment = (props) => {
	
	switch (props.dialog){
		case 'comment':
			content = <CommentComposerM 
							yellId={props.yell._id} 
							yellOwnerId={props.yell.ownerId} />
			break;
		case 'joining':
			content ="joining" + props.yell._id
			break;	
	}

	return ( <span> {content} </span> )
}

export default YellFragment;