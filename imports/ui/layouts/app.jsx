import React from 'react';
//import Navigation  from '../components/navigation.jsx';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export const App = ({children}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      
        <div className="ui grid">
        	
      	  {children}
       </div> 
    </div>
   </MuiThemeProvider> 
)