import './routes.jsx';
import '../both.js';
import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
import i18n from 'meteor/universe:i18n';
injectTapEventPlugin();
Meteor.subscribe('yells')

  moment.locale(navigator.language);

