import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';;
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash'
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';


 const handleToogle =(user,yell) => {
         if (_.includes(approved, user)==false) {
          Meteor.call('approveJoin',user,yell, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
                console.log('approveJoin')
              }                 
          });
       } else {
             Meteor.call('cancelApprove',user,yell, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
                console.log('cancelApprove')
              }           
          });
       }

 } 


 const getListItem = (requerer,approved,ownership,yellId)  =>{

 
if (ownership) {
    return <ListItem
                leftAvatar={<Avatar src={requerer.profile.avatar} />} 
                primaryText={requerer.username} 
                rightToggle={<Toggle
                               toggled={_.includes(approved, requerer._id)}
                              onToggle={()=>handleToogle(requerer._id,yellId)}  
                               /> } 
                  />
   
    } else {

    return <ListItem
              primaryText={ requerer.username }
              leftAvatar={<Avatar src={requerer.profile.avatar} />}
          />
    }
}

const renderIfData = (requerers,approved,ownership,yellId) => {

    if (requerers && requerers.length >0 ) {
    return requerers.map( ( requerer ) => {
      return  (
         <span key={requerer._id} >
           {getListItem(requerer,approved,ownership,yellId)}   
              <Divider inset={true} />
         </span>
  
        ) ;
    });
  } else {
    return ( <ListItem primaryText="no participants" />) ;
  }
};


 const RawJoiningList = ( {requerers,approved,ownership,yellId } ) => 
  (
 <div style={styles.listSegment} className="comments">
      <List style={styles.list} > 
    {ownership==1?<Subheader>Approve people who you want</Subheader>:
      <Subheader>People who want to join</Subheader>}

  { renderIfData(requerers,approved,ownership,yellId) }

      </List>  
      {/* if add drawer here, it will rendered on left column itself */}
  </div> 
);

export default RawJoiningList


const styles = {
        list:{
          backgroundColor:'white'
        },
        subhead:{
          fontSize:11,
          color:'#9E9E9E'
        },
        listSegment:{
          height:'54vh',
          maxHeight:'84vh'
        }

    }