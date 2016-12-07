import React, { Component } from 'react';
import CommentComposerM from './comments/CommentComposerM.jsx'
import JoiningComposerM from './joining/JoiningComposerM.jsx'
import BlockedUser from './others/BlockedUser.jsx'


const YellFragment = (props) => {
	blocked = props.userBlocked
	dialog = props.dialog
	yellfySuggestions = props.yell.suggestionsByYellfi
	
	if (yellfySuggestions && yellfySuggestions.length>0){
		suggestions = yellfySuggestions
	
	} else {
		suggestions = false
	}
	
	if (blocked==false) {
		switch (props.dialog){
			case 'comment':
			
				content = <CommentComposerM 
								yellId={props.yell._id} 
								yellOwnerId={props.yell.ownerId}
								plan={props.yell.plan}
								suggestions= {suggestions} 
								/>
				break;
			
			case 'joining':
				content = <JoiningComposerM  yell={props.yell} />
				break;	
		}
	} else {
		content =<BlockedUser />
	}

	return ( <span style={{backgroundColor:'rgba(0, 0, 0, 0.02)'}} > {content} </span> )
}

export default YellFragment; //in YelComposer

