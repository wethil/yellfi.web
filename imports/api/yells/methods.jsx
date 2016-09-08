import { Meteor } from 'meteor/meteor';
import Yells from './yells.js'


Meteor.methods({
   addYell: function(lat,lng,plan,planType,desc,date,time,place,owner) {
    Yells.insert({
    	 loc: {
                type: "Point",
                coordinates : [lat,lng]
            },
            plan : plan,
            planType:planType,
            desc :desc,  
            created_at : created_at,
            date:date,
            time : time,
            place :place,
            ownerId:owner,           
            created_at : new Date()
        })

    },
    addBasicYell:function(lat,lng,plan,desc,owner){
        Yells.insert({
            plan : plan,
            desc :desc,
            ownerId:owner,
            loc: {
                type: "Point",
                coordinates : [lat,lng]
            },
            created_at : new Date()
        })

    },
    reqJoin:function(userId,yell) {
        Yells.update({_id:yell}, {$push : {requested : userId }})
    },
    cancelJoin: function(userId,yell) {
         Yells.update({_id:yell}, {$pull : {requested : userId }})
    },
    approveJoin:function(userId,yell) {
        Yells.update({_id:yell}, {$push : {approved : userId }})
    },
    cancelApprove:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {approved : userId }})
    }

});

