import './routes.jsx';
import '../both.js';
import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
Meteor.subscribe('yells')
