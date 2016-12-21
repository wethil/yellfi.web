import React, { Component } from 'react';
import CommentComposerM from './comments/CommentComposerM.jsx'
import JoiningComposerM from './joining/JoiningComposerM.jsx'
import BlockedUser from './others/BlockedUser.jsx'
import NoAnyYell from './others/NoAnyYell.jsx'


const YellFragment = (props) => {
	blocked = props.userBlocked
	dialog = props.resDialog
	yellfySuggestions = props.suggestionsByYellfi
	if (yellfySuggestions && yellfySuggestions.length>0){
		suggestions = yellfySuggestions
	
	} else {
		suggestions = false
	}
	
	if (blocked==false) {
		switch (props.resDialog){
			case 'comment':
			
				content = <CommentComposerM 
								yellId={props.yell._id}
								yellOwner={props.yell.owner}
								plan={props.yell.plan}
								keyword={props.yell.keyword}
								suggestions= {suggestions}
								publicity={props.yell.publicity==0?false:true} 
								/>
				break;
			
			case 'joining':
				content = <JoiningComposerM  yell={props.yell} />
				break;	
			case false :
				content = <NoAnyYell />
				break;
			default : 
				content = <NoAnyYell />
				break;	
		}
	} else {
		content =<BlockedUser />
	}

	return ( <span style={{backgroundColor:'rgba(0, 0, 0, 0.02)'}} > {content} </span> )
}

export default YellFragment; //in YelComposer

