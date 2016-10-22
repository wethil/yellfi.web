const fields = {fields:{'services':0 ,'createdAt':0 ,'emails' :0 }}

Notifications = new Mongo.Collection('notifications' ,{
                transform : function(doc) {
                  doc.sender = Meteor.users.findOne({_id:doc.senderId},fields);
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
    created_at: {
     type: Date,
     denyUpdate: true
    },
    about: {
      type:String,
      allowedValues:['yell','comment','suggestion','like']
    },
    yellId:{
      type:String
    },
    yellContent:{
      type:String,
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
