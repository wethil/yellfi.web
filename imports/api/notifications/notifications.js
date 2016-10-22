const fields = {fields:{'services':0 ,'createdAt':0 ,'emails' :0 }}

Notifications = new Mongo.Collection('notifications' ,{
                transform : function(doc) {
                  doc.sender = Meteor.users.findOne({_id:doc.senderId},fields);
                  doc.receiver = Meteor.users.findOne({_id:doc.receiverId},fields);
                  return doc
                }
              });






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
    title : {
      type : String,
      optional:true
    },
    content: {
      type: String,
      denyUpdate: true
    },
    publicity: {
     type: Date,
     denyUpdate: true
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
