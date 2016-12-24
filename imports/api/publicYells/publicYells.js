const yellFields ={'plan':1,'ownerId':1}
import LocationSchema from '../Schemas/LocationSchema.js'
import Yells from '../yells/yells.js'

PublicYells = new Mongo.Collection('publicYells' ,{
                transform : function(doc) {
                  doc.yell = Yells.findOne({_id:doc.refYellId},{fields:yellFields});
                  return doc
                }
              });



PublicYells.attachSchema(
    new SimpleSchema({
    refYellId: { 
      type: String
    },
     publicPlanLoc: {
      type: LocationSchema
    },
  })
);



PublicYells.allow({
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

export default PublicYells;
