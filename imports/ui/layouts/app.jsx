import React from 'react';
import { Meteor } from 'meteor/meteor'
//import Navigation  from '../components/navigation.jsx';
import ObserveNotificationAlert from '../components/LeftColumn/Notifications/ObserveNotificationAlert.jsx'
import LeftColumn from '../components/LeftColumn/LeftColumn.jsx'
import RightColumn from '../components/RightColumn/RightColumn.jsx'
import Middle from '../components/Middle/Middle.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from '../components/mobile/Index.jsx'

export const App = ({children}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>

  <div >
  	<Index />
    {children} 
  </div>
  </MuiThemeProvider>  
)


/*
<MuiThemeProvider muiTheme={getMuiTheme()}>
  <div className="ui stackable grid" style={{height: '100vh',overflowY:'hidden'}} >
    
      <div className="five wide column ">
        <LeftColumn  />
      </div>
      {children} 
    </div>

</MuiThemeProvider> 
*/




