import React from 'react';
import { Meteor } from 'meteor/meteor'
//import Navigation  from '../components/navigation.jsx';
import Paper from 'material-ui/Paper';
import MapComposer from '../components/map/MapComposer.jsx'
import ClusterAvatars from '../components/map/ClusterAvatars.jsx'
import ObserveNotificationAlert from '../components/LeftColumn/Notifications/ObserveNotificationAlert.jsx'
import LeftColumn from '../components/LeftColumn/LeftColumn.jsx'
import RightColumn from '../components/RightColumn/RightColumn.jsx'
import emitter from '../components/emitter.js'



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
              <div className="eleven wide column animated fadeIn fixed ">
      
                
                    <MapComposer />
                
          <div  className="two wide column">
              <ClusterAvatars />
          </div>
                
              </div>
               <ObserveNotificationAlert />
                {children}
               
                
      </div>
       </div> 
    </div>
   </MuiThemeProvider> 
)





