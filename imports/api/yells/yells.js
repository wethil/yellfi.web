import LocationSchema from '../Schemas/LocationSchema.js'
const fields = {fields:{'services':0 ,'createdAt':0 ,'emails' :0 }}

Yells = new Mongo.Collection('yells' ,{
                transform : function(doc) {
                  doc.owner = Meteor.users.findOne({_id:doc.ownerId},fields);
                  return doc
                }
              });



/*
 [
  { id: 0, content: 'Listening Music', icon: "audiotrack" },
  { id: 1, content: 'Watching Something', icon: "movie_creation"},
  { id: 2, content: 'Reading a Book', icon:"local_library" },
  { id: 3, content: 'Eating and Drinking', icon:"restaurant" },
  { id: 4, content: 'Cooking', icon:"whatshot"  },
  { id: 5, content: 'Going Outside', icon:"nature_people" },
  { id: 6, content: 'Going to Shopping', icon:"shopping_cart" },
  { id: 7, content: 'Hanging out with Someone', icon:"local_cafe" },
  { id: 8, content: 'Biking', icon:"directions_bike"  },
  { id: 9, content: 'Hiking', icon:"directions_run" },
  { id: 10, content: 'Custom', icon:"add" }
]

*/



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
        optional : true
    },
    comment_quantity : {
       type : Number,
        optional : true
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
    gotSuggestionByYellfi : {
      type:Boolean,
      defaultValue:false
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
