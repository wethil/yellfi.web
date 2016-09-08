import LocationSchema from '../Schemas/LocationSchema.js'

Yells = new Mongo.Collection('yells' ,{
                transform : function(doc) {
                  doc.owner = Meteor.users.findOne({
                    _id:doc.ownerId
                  },{fields: {
                              'services':0 ,
                              'createdAt':0 ,
                               'emails' :0
                         }});
                  return doc
                }
              });






Yells.attachSchema(
    new SimpleSchema({
    loc: {
      type: LocationSchema,
     optional: true
    },
    plan: {
      type: String,
      defaultValue : "I am boored"
    },
    desc :{
      type : String,
      optional : true
    },
    place : {
      type:String,
      optional:true
    },
    time : {
      type : String,
      optional:true
    },
    created_at: {
      type: Date,
      denyUpdate: true
    },
    planType: {
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
    requested : {
      type: [String],
      defaultValue:[]
    },
    approved : {
      type:[String],
      defaultValue:[]
    },
    visible :{
      type:Number,
      defaultValue:1
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
