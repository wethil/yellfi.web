import React, { Component } from 'react';
import {plans,ntfTitles} from '../../../../constants.js';

 class YellForm extends Component {
	render() {
		return (
			<div className="ui  large fluid vertical menu">
			  	{plans.map((plan) => {
						return 	 <a className="item" key={plan.id} >
					<span>	<i style={styles.icon} className="material-icons">{plan.icon}</i> </span>
							<div style={styles.content} >  {i18n.__(plan.content)} </div>
									  </a>		
					}) }
			</div>

		);
	}
}
export default YellForm;

const styles = {
	icon:{
		'lineHeight': 0,
   		fontSize: '1.3em'
	},
	content:{
		marginLeft: '13%',
	    top: '0.7em',
	    position: 'absolute'
	}
}











/**

<div className="ui vertical large basic fluid buttons">
			  <button className="ui button">Feed</button>
			  <button className="ui button">Messages</button>
			  <button className="ui button">Events</button>
			  <button className="ui button">Photos</button>
			   <button className="ui button">Feed</button>
			  <button className="ui button">Messages</button>
			  <button className="ui button">Events</button>
			  <button className="ui button">Photos</button>
			   <button className="ui button">Feed</button>
			  <button className="ui button">Messages</button>
			  <button className="ui button">Events</button>
			</div>

			*/