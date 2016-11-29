const fields = {fields:{'firstName':1 ,'picture':1  }}
import Yells from '../yells/yells.js'
Notifications = new Mongo.Collection('notifications' ,{
                transform : function(doc) {
                  doc.sender = Meteor.users.findOne({_id:doc.senderId},fields);
                  doc.yell = Yells.findOne({_id:doc.yellId},{fields:{plan:1}})
                  return doc

                }
              });



/*
content = [
  { id: 0, content: 'made a suggestion' },
  { id: 1, content: 'liked your suggestion'},
  { id: 2, content: 'wants to join you for'},
  { id: 3, content: 'approve you to join'}
  { id: 4, content: 'commented to this plan'}
]
about = [
  { id: 0, content: 'yell' },
  { id: 1, content: 'comment'},
  { id: 2, content: 'participation'},
  { id: 3, content: 'like'},
  { id: 4, content: 'comment'}
]

*/


Notifications.attachSchema(
    new SimpleSchema({
    senderId: {
      type: String,
      optional:true
    },
    receiverId :{
      type : String,
      optional : true
    },
    content: {
      type: Number,
      allowedValues:[0,1,2,3,4]
    },
    created_at: {
     type: Date,
     denyUpdate: false
    },
    about: {
      type:Number,
      allowedValues:[0,1,2,3,4]
    },
    yellId:{
      type:String
    },
    received:{
      type:Boolean,
      defaultValue:false
    },
    alerted:{
      type:Boolean,
      optional:true
    }
  })
);



Notifications.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});

export default Notifications;


