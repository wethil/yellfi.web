import React, { Component } from 'react';
import SubmitForm from './SubmitForm.jsx'
import {plans} from '../../../../constants.js';
import emitter from '../../../../emitter.js'; // it is use main emitter to connect SuggestionPaws




 class YellForm extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	planChoosed:false,
 	  	publicity:0
 	  };
 	}

componentDidMount(){
	emitter.addListener('backToPlanList',() => {
 		 	this.setState({planChoosed:false,publicity:0})
 		  });
}


	chooseParticipation(id){
		$('.button.pub').toggleClass('basic',true).removeClass('blue')
		$('#'+id).removeClass('basic').addClass('blue')
		this.setState({publicity:id})
	}

	choosePlan(planId){
		 this.setState({planChoosed:true,plan:planId }) 
		 if (planId==7) {
		 	this.setState({publicity:1})
		 }

	}

	render() {

		const {coordinates} = this.props
		const {planChoosed,plan,publicity} = this.state
		const classNamesForHOWS = (plan==7) ? "ui blue button pub" : "ui basic button pub"

		if (!planChoosed) {
			return (<div className="ui  large fluid vertical menu">
								 {plans.map((plan) => {
								return 	 <a className="item" 
											 onClick= { ()=> this.choosePlan(plan.id)}
											 key={plan.id} >
											<i style={styles.icon} className="material-icons">{plan.icon}</i> 
											<div style={styles.content} >  {i18n.__(plan.content)} </div>
										 </a>})}
									</div>)
		} else {
			return (
						<div>
							<div className="ui vertical fluid  labeled icon buttons">
								{(plan && plan!=7)?<button id={0} onClick={()=> this.chooseParticipation(0)} className="ui blue button pub">
																	<i className="user icon"></i>
																	 {i18n.__('common.publicity.justMe')}
								</button>:null}
								<button  id={1}  onClick={()=> this.chooseParticipation(1)} className={classNamesForHOWS} >
									<i className="users icon"></i>
									{i18n.__('common.publicity.everyoneCan')}
								</button>
								<button id={2} onClick={()=> this.chooseParticipation(2)} className="ui basic button pub">
									<i className="add user icon"></i>
									{i18n.__('common.publicity.willChoose')}
								</button>
							</div>
							<div className="ui container">
								<SubmitForm coordinates={coordinates} chosenPlan={plan} publicity={publicity} />
							</div>
					
						</div>

			)
		} 
		
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