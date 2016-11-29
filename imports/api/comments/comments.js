
Comments = new Mongo.Collection('comments' ,{
                transform : function(doc) {
                  doc.owner = Meteor.users.findOne({
                    _id:doc.ownerId
                  },{fields: {
                              'picture':1,
                               'firstName' :1
                         }});
                  return doc
                }
              });

Comments.attachSchema(
    new SimpleSchema({
    content: {
      type: String,
      defaultValue : "Listen Neşet Ertaş" //max will be 218
    },
    yellId:{
      type:String
    },
    yellOwnerId:{
      type:String
    },
    likes:{
      type:[String],
      defaultValue:[]
    },
    created_at: {
      type: Date,
      denyUpdate: true
    },
    rating : {
        type : Number,
        defaultValue : 0
    },
    ownerId : {
         type : String,
         defaultValue : "yellfi"
    },
    visible :{
      type:Boolean,
      defaultValue:true
    }
  })
);



Comments.allow({
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

export default Comments;