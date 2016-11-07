import React from 'react';
import { Meteor } from 'meteor/meteor'
//import Navigation  from '../components/navigation.jsx';
import ObserveNotificationAlert from '../components/LeftColumn/Notifications/ObserveNotificationAlert.jsx'
import LeftColumn from '../components/LeftColumn/LeftColumn.jsx'
import RightColumn from '../components/RightColumn/RightColumn.jsx'
import Middle from '../components/Middle/Middle.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export const App = ({children}) => (
<MuiThemeProvider muiTheme={getMuiTheme()}>
  <div>
  <div className="ui grid" style={{height: '100vh'}} >
    <div className="ui stackable two column grid main_content fixed ">
      <div className="five wide column ">
        <LeftColumn  />
      </div>
      <Middle />
      <ObserveNotificationAlert />
      {children} {/*right column*/}
    </div>
  </div> 
  </div>
</MuiThemeProvider> 
)





