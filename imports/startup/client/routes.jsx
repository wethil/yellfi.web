import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from '../../ui/layouts/app.jsx';
import Index from '../../ui/components/index.jsx';
import RightColumn from '../../ui/components/RightColumn/RightColumn.jsx';
import SecondActivity from '../../ui/components/mobile/SecondActivity/SecondActivity.jsx'
//import  {Admin}  from '../../ui/components/admin/Admin.jsx';
//import { NotFound } from '../../ui/components/NotFound.jsx';

//import YellContainer  from '../../ui/containers/YellContainer.jsx'
Meteor.startup(()=> {
    render (
        <Router history={browserHistory} >
            <Route path="/" component={App} >
              {/**    <IndexRoute component={ Index } /> **/}

                <Route path="/y/:id" component = {SecondActivity} /> 
          
            </Route>
            {/**<Route path="*" component={NotFound} /> **/}
        </Router>,
        document.getElementById( 'react-root' )
    )
});
