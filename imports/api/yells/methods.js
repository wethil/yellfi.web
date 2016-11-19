import { Meteor } from 'meteor/meteor';
import Yells from './yells.js'
import Comments from '../comments/comments.js'
import PublicYells from '../publicYells/publicYells.js'
import Notifications from '../notifications/notifications.js'
 
const yellsFieldsOpt= {'plan':1,'loc':1,'time':1,'created_at':1,'publicity':1,'ownerId':1}

Meteor.methods({
   addYell: function(loc,publicPlanLoc,plan,keyword,time,publicity,ownerId) {
   
    if(publicPlanLoc && publicPlanLoc.coordinates){
       mainYell= Yells.insert({
            loc:loc,
            publicPlanLoc:publicPlanLoc,
            plan : plan,
            keyword:keyword,
            time:time,
            created_at : new Date(),
            publicity:publicity,
            ownerId:ownerId

        })

        PublicYells.insert({refYellId:mainYell});
        return mainYell
    } else {
        return Yells.insert({
            loc:loc,
            plan : plan,
            keyword:keyword,
            time:time,
            created_at : new Date(),
            publicity:publicity,
            ownerId:ownerId

        })
    }



    },
    blockUserFromComment:function(commentId,userId,yell) {
        Yells.update({_id:yell}, {$push : {blocked_users : userId }})
        Comments.update({_id:commentId}, {$set : {visible : false }})

    },
    unblockUser:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {blocked_users : userId }})
    },
    reqJoin:function(userId,yell,publicity,yellOwnerId) {
        if (publicity==1) {
            Yells.update({_id:yell}, {$push : {requests : userId , approved:userId }})

        } else {
            Yells.update({_id:yell}, {$push : {requests : userId }})
             
             Notifications.insert({
                senderId:userId,
                receiverId:yellOwnerId,
                content:2,
                created_at:Date(),
                about:2,
                yellId:yell
             })
        }
    },
    approveJoin:function(userId,yell,yellOwnerId) {
        Yells.update({_id:yell}, {$push : {approved : userId }})
        
         Notifications.insert({
                senderId:yellOwnerId,
                receiverId:userId,
                content:3,
                created_at:Date(),
                about:2,
                yellId:yell
             })

    },
    cancelApprove:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {approved : userId }})
    },
     cancelJoin: function(userId,yell) {//requerers will use this
         Yells.update({_id:yell}, {$pull : {requests : userId }})
    },
      approveAll:function(userArray,yell) {
        Yells.update({_id:yell}, {$push:{approved:{$each:userArray }}})
    },
    deleteYell:function(yellId) {
        Yells.update({_id:yellId}, {$set : {visible : false }})
        
    },
    undoDeleteYell:function(yellId) {
        Yells.update({_id:yellId}, {$set : {visible : true }})
    },
    makeSuggestion:function(yellId,suggestions){
        Yells.update({_id:yellId}, {$set : {suggestionsByYellfi : suggestions }})
    }

});


