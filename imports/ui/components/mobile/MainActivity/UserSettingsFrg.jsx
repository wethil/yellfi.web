import React, { Component } from 'react';
import UserComposer from './user/UserComposer.jsx'
import LoadingCircle from './user/LoadingCircle.jsx'


 class UserSettingsFrg extends Component {



	render() {
		const {activeTab} =this.props	
		content = (activeTab==3) ?<UserComposer /> : <LoadingCircle />		
		
		return (
		<div>		
			{content}
		</div>		
		);
	}
}
export default UserSettingsFrg;