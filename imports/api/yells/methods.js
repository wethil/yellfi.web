import { Meteor } from 'meteor/meteor';
import Yells from './yells.js'
import Comments from '../comments/comments.js'

Meteor.methods({
   addYell: function(loc,plan,keyword,time,publicity,ownerId) {
    Yells.insert({
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
        Comments.update({_id:commentId}, {$set : {visible : 0 }})

    },
    unblockUser:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {blocked_users : userId }})
    },
    reqJoin:function(userId,yell) {
        Yells.update({_id:yell}, {$push : {requests : userId }})
    },
    approveJoin:function(userId,yell) {
        Yells.update({_id:yell}, {$push : {approved : userId }})
    },
    cancelApprove:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {approved : userId }})
    },
     cancelJoin: function(userId,yell) {//requerers will use this
         Yells.update({_id:yell}, {$pull : {requests : userId }})
    },
      approveAll:function(userArray,yell) {
        Yells.update({_id:yell}, {$push:{approved:{$each:userArray }}})
    }
});


