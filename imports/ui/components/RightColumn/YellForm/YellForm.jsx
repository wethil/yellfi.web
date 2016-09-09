import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ImageAudiotrack from 'material-ui/svg-icons/image/audiotrack'
import ImageMovieCreation from 'material-ui/svg-icons/image/movie-creation'
import ImageNaturePeople from 'material-ui/svg-icons/image/nature-people'
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library'
import MapsRetaurant from 'material-ui/svg-icons/maps/restaurant'
import MapsLocalCafe from 'material-ui/svg-icons/maps/local-cafe'
import MapsDirectionsBike from 'material-ui/svg-icons/maps/directions-bike'
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import SocialWhatShot from 'material-ui/svg-icons/social/whatshot'
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import ExtraFormElements from './ExtraFormElements.jsx'
import emitter from '../../emitter.js'
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';


const dataSource1 = ['hiphop', 'rap', 'jazz']

export default class YellForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePlan: 9,
			forms: false, //value presents hidden step
			publicity: 0,
			date: 0,
			time: 0
		};
	}

	componentDidMount() {

		emitter.addListener('changeDate', (date) => this.changeDate(date));
		emitter.addListener('changeTime', (time) => this.changeTime(time));
		emitter.addListener('changePublicOpt', (publicOpt) => this.changePublicOpt(publicOpt));



	}
	changeDate(date) {
		console.log(date)
	}
	changeTime(time) {
		console.log(time)
	}
	changePublicOpt(publicOpt) {
		console.log(publicOpt)
	}

	handleSelectChange() {

		this.setState({
			forms: '',
			plans: 'hidden'
		})
	}

	changePublicity(e) {
		console.log(value)
	}

	render() {
		formAppBarIcon = <IconButton onMouseDown={() => this.setState({ forms: false }) }> <NavigationArrowBack /></IconButton>

		return (

			<div>

			             <Menu
					onItemTouchTap={(event, menuItem) => { this.setState({ forms: true, activePlan: menuItem.props.value }); console.log(menuItem.props.value) } }
					listStyle={{ cursor: 'pointer' }}>

					{plans.map((plan) => {
						return <MenuItem
							key={plan.id}
							innerDivStyle={{ width: 280 }}
							leftIcon={plan.icon}
							value={plan.id}
							primaryText={plan.content} />;
					}) }
				</Menu>


				<Drawer width={280} openSecondary={true} open={this.state.forms} >
					<AppBar
						titleStyle={styles.formTitle}
						iconElementLeft={formAppBarIcon}
						title={plans[this.state.activePlan].content}
						/>

					<div style={styles.drwPadd} >



						<RadioButtonGroup name="privacy"  style={{ marginTop: 16 }} onChange={(event, value) => this.setState({ publicity: value }) } defaultSelected={0}>
							<RadioButton
								value={0}
								label="Just me"
								disabled={this.state.activePlan == 6 ? true : false}
								style={styles.radioButton}
								/>
							<RadioButton
								value={1}
								label="Everyone Can Join"

								style={styles.radioButton}
								/>
							<RadioButton
								value={2}
								label="I'll choose participants"

								style={styles.radioButton}
								/>
						</RadioButtonGroup>
						<AutoComplete
							floatingLabelText="Choose keyword for your plan.(optional)"
							hintText="Click and choose"
							filter={AutoComplete.noFilter}
							textFieldStyle={{ fontSize: 13 }}
							openOnFocus={true}
							dataSource={dataSource1}
							/><br />


						{this.state.publicity == 0 ?

							<div className="className"></div>
							:
							<ExtraFormElements />
						}
						<RaisedButton style={{ width: 256 }}  label="Get Suggestions!" primary={true} />
					</div>

				</Drawer>



			</div>

		);
	}
}

const plans = [
	{ id: 0, content: 'Listening Music', icon: <ImageAudiotrack /> },
	{ id: 1, content: 'Watching Something', icon: <ImageMovieCreation /> },
	{ id: 2, content: 'Reading a Book', icon: <MapsLocalLibrary /> },
	{ id: 3, content: 'Eating and Drinking', icon: <MapsRetaurant /> },
	{ id: 4, content: 'Cooking', icon: <SocialWhatShot /> },
	{ id: 5, content: 'Going Outside', icon: <ImageNaturePeople /> },
	{ id: 6, content: 'Going to Shopping', icon: <ActionShoppingCart /> },
	{ id: 7, content: 'Hanging out with Someone', icon: <MapsLocalCafe /> },
	{ id: 8, content: 'Biking', icon: <MapsDirectionsBike /> },
	{ id: 9, content: 'Hiking', icon: <MapsDirectionsRun /> },
	{ id: 10, content: 'Custom', icon: <ContentAdd /> }
]

const styles = {
		  drwPadd: {
		paddingLeft: 10
		  },
	radioButton: {
		marginBottom: 16,
		  },
		  labelStyle: {
		fontSize: 11,
		margin: 1
	},
	formTitle: {
		fontSize: 18
	}
};