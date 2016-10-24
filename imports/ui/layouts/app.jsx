import React from 'react';
import { Meteor } from 'meteor/meteor'
//import Navigation  from '../components/navigation.jsx';
import Paper from 'material-ui/Paper';
import YellMap from '../components/map/YellMap.jsx'
import ObservedNotificationsComposer from '../components/LeftColumn/Notifications/ObservedNotificationsComposer.jsx'
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
      
                  <YellMap />

                
                  <button style={styles.button} className="ui button"> button</button>
              </div>
                {children}
                <ObservedNotificationsComposer />
                
      </div>
       </div> 
    </div>
   </MuiThemeProvider> 
)






const styles = {
  button:{
    zIndex:2,
    position:'absolute'
  }
};


  