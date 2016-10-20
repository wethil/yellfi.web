import LocationSchema from '../Schemas/LocationSchema.js'
const fields = {fields:{'services':0 ,'createdAt':0 ,'emails' :0 }}

Yells = new Mongo.Collection('yells' ,{
                transform : function(doc) {
                  doc.owner = Meteor.users.findOne({_id:doc.ownerId},fields);
                  return doc
                }
              });






Yells.attachSchema(
    new SimpleSchema({
    loc: { //MultiPoint Loc incllude ipLoc and GeoLoc. use coordinates[1] for
      type: LocationSchema,
      optional:true
    },
    plan: {
      type: String,
      defaultValue : "I am boored"
    },
    keyword :{
      type : String,
      optional : true
    },
    time : {
      type : Date,
      optional:true
    },
    created_at: {
      type: Date,
      denyUpdate: true
    },
    publicity: {
      type:Number,
      defaultValue:0 // 0 is just for owner, 1 is public 2 is private
    },
    rating : {
        type : Number,
        defaultValue : 0
    },
    comment_quantity : {
       type : Number,
        defaultValue : 0
    },
    ownerId : {
         type : String,
         defaultValue : "yellfi"
    },
    requests : {
      type: [String],
      defaultValue:[]
    },
    approved:{
      type:[String],
     defaultValue:[]
    },

    visible :{
      type:Boolean,
      defaultValue:true
    },
    blocked_users:{
      type:[String],
      optional:true
    }

  })
);



Yells.allow({
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

export default Yells;
