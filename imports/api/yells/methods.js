import { Meteor } from 'meteor/meteor';
import Yells from './yells.js'
import Comments from '../comments/comments.js'
import Notifications from '../notifications/notifications.js'


Meteor.methods({
   addYell: function(loc,plan,keyword,time,publicity,ownerId) {
   return Yells.insert({
            loc:loc,
            plan : plan,
            keyword:keyword,
            time:time,
            created_at : new Date(),
            publicity:publicity,
            ownerId:ownerId

        })
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
    }
});


