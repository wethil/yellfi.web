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
    }
});

