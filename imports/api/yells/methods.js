import { Meteor } from 'meteor/meteor';
import Yells from './yells.js'


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
    blockUser:function(userId,yell) {
        Yells.update({_id:yell}, {$push : {blocked_users : userId }})
    },
    unblockUser:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {blocked_users : userId }})
    }
});

