import { Meteor } from 'meteor/meteor';
import Yells from '../../yells/yells.js'
import PublicYells from '../publicYells.js'


const fieldsOpt = {fields:{'firstName':1,'picture':1,}}






Meteor.publishComposite('PlansOnMapBox',function(bounds) {
  return { find: function() {
           // Find top ten highest scoring posts
           return PublicYells.find(
                 {  
                   "publicPlanLoc":{ $geoWithin :{ $box : bounds} },

                 },{fields:{'publicPlanLoc.type':0}});
       },
       children: [
           {
               find: function(publicYell) {
                   return Yells.find(
                       { _id: publicYell.refYellId });
               },
                   children: [
                   {
                       find: function(yell,publicYell) {
                           // Find user that authored comment.
                           return Meteor.users.find(
                               { _id: yell.ownerId },fieldsOpt);
                       }
                   }
               ]
           }
       ]}
});