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
import NoParticipants from './JoiningComponents/NoParticipants.jsx'


 const handleToogle =(approved,user,yell) => {
  yellOwnerId = Meteor.userId()
         if (_.includes(approved, user)==false) {
          Meteor.call('approveJoin',user,yell,yellOwnerId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
                console.log('approveJoin')
              }                 
          });
       } else {
             Meteor.call('cancelApprove',user,yell,yellOwnerId, error => { 
              if (error) { 
                  console.log('error', error); 
              } else {
                console.log('cancelApprove')
              }           
          });
       }

 } 

 const cancelJoin = (user,yell) => {
   Meteor.call('cancelJoin',user,yell, error=> {
      if (error) {
        console.log(error)
      }else {
        console.log('cancelJoin')
      }
   });
 }


 const getListItem = (requerer,approved,ownership,yellId)  =>{

 
if (ownership) {
    return <ListItem
                leftAvatar={<Avatar src={requerer.picture} />} 
                primaryText={requerer.firstName} 
                rightToggle={<Toggle
                               toggled={_.includes(approved, requerer._id)}
                              onToggle={()=>handleToogle(approved,requerer._id,yellId)}  
                               /> } 
                  />
    } else {
          if (Meteor.userId()&&requerer._id==Meteor.userId()) {
          return <ListItem
              disabled={true}
                primaryText={ requerer.firstName }
                leftAvatar={<Avatar src={requerer.picture} />}
                rightIconButton={
                   <IconButton
                        iconClassName="material-icons"
                        tooltip={i18n.__('common.joining.leave')}
                        onTouchTap ={()=>cancelJoin(requerer._id,yellId)}
                      >
                        close
                      </IconButton>
                }
            />
          } else {
                  return <ListItem
                primaryText={ requerer.firstName }
                leftAvatar={<Avatar src={requerer.picture} />}
          
            />
          }

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
    return ( <NoParticipants ownership={ownership} />) ;
  }
};


 const RawJoiningList = ( {requerers,approved,ownership,yellId } ) => 
  (
 <div style={styles.listSegment} className="comments">
      <List style={styles.list} > 
    {ownership==1?<Subheader>{i18n.__('common.joining.approveDesired')}</Subheader>:
      <Subheader>{i18n.__('common.joining.peopleWantJoin')}</Subheader>}

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