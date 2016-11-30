import React, { Component } from 'react';

 class RawJoiningListM extends Component {
	render() {

		const {requerers,approved,ownership,yellId,publicity} = this.props

		requererList = []
		if (requerers && requerers.length>0) {
				requerers.forEach((requerer) => {
					requererList.push(<span>requerer <br /> </span>)
				});
		} else {
			requererList="no req"
		}

		return (
			<div> {requererList} </div>
		);
	}
}
export default RawJoiningListM;