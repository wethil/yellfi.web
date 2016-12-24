import React, { Component } from 'react';
import UserComposer from './UserComposer.jsx'
import LoadingCircle from '../Yells/YellsComponents/LoadingCircle.jsx'



const UserSettingsCont =(props)=> {
	
	content = (props.activeTab==3) ?<UserComposer /> : <LoadingCircle />	
	return content


}

export default UserSettingsCont;