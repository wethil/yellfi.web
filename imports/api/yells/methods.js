import { Meteor } from 'meteor/meteor';
import Yells from './yells.js'
import Comments from '../comments/comments.js'
import PublicYells from '../publicYells/publicYells.js'
import Notifications from '../notifications/notifications.js'
 
const yellsFieldsOpt= {'plan':1,'loc':1,'time':1,'created_at':1,'publicity':1,'ownerId':1}

Meteor.methods({
   addYell: function(loc,publicPlanLoc,plan,keyword,time,publicity) {
   
    if(publicity!=0){
       mainYell= Yells.insert({
            loc:loc,
            publicPlanLoc:publicPlanLoc,
            plan : plan,
            keyword:keyword,
            time:time,
            created_at : new Date(),
            publicity:publicity,
            ownerId:this.userId

        })

        PublicYells.insert({refYellId:mainYell,publicPlanLoc:publicPlanLoc,});
        return mainYell
    } else {
        return Yells.insert({
            loc:loc,
            plan : plan,
            keyword:keyword,
            time:time,
            created_at : new Date(),
            publicity:publicity,
            ownerId:this.userId

        })
    }



    },
    blockUserFromComment:function(commentId,userId,yell) {
        Yells.update({_id:yell}, {$push : {blocked_users : userId }})
        Comments.update({_id:commentId}, {$set : {visible : false }})

    },
    unblockUser:function(commentId,userId,yell) {
        Yells.update({_id:yell}, {$pull : {blocked_users : userId }})
        Comments.update({_id:commentId}, {$set : {visible : true }})
    },
    reqJoin:function(userId,yell,publicity,yellOwnerId) {
        if (publicity==1) {
            Yells.update({_id:yell}, {$push : {requests : this.userId , approved:this.userId }})
            Yells.update({ _id: yell }, {$inc: {jQ :1}});
             Notifications.insert({
                senderId:yellOwnerId,
                receiverId:this.userId,
                content:3,
                created_at:Date(),
                about:2,
                yellId:yell
             })

        } else {
            Yells.update({_id:yell}, {$push : {requests : this.userId }})
             
           /*  Notifications.insert({
                senderId:this.userId,
                receiverId:yellOwnerId,
                content:2,
                created_at:Date(),
                about:2,
                yellId:yell
             })*/

            Notifications.upsert({
                senderId:this.userId,
                receiverId:yellOwnerId,
                content:2,
                about:2,
                yellId:yell
            },
            {
                $set: {
                    senderId:this.userId,
                    receiverId:yellOwnerId,
                    created_at:new Date(),
                    received:false,
                    alerted:false,
                    content:2,
                    about:2,
                    yellId:yell
                }
            })
        }
    },
    approveJoin:function(userId,yell,yellOwnerId) {
        Yells.update({_id:yell}, {$push : {approved : userId }})
        Yells.update({ _id: yell }, {$inc: {jQ :1}});
        /* Notifications.insert({
                senderId:yellOwnerId,
                receiverId:userId,
                content:3,
                created_at:Date(),
                about:2,
                yellId:yell
             })*/
              Notifications.upsert({
                senderId:this.userId,
                receiverId:userId,
                content:3,
                about:2,
                yellId:yell
            },
            {
                $set: {
                    senderId:this.userId,
                    receiverId:userId,
                    created_at:new Date(),
                    received:false,
                    alerted:false,
                    content:3,
                    about:2,
                    yellId:yell
                }
            })





    },
    cancelApprove:function(userId,yell) {
        Yells.update({_id:yell}, {$pull : {approved : userId }})
        Yells.update({ _id: yell }, {$inc: {jQ :-1}});
    },
     cancelJoin: function(userId,yell) {//requerers will use this
         Yells.update({_id:yell}, {$pull : {requests : userId }})
    },
      approveAll:function(userArray,yell) {
        Yells.update({_id:yell}, {$push:{approved:{$each:userArray }}})
    },
    deleteYell:function(yellId) {
        Yells.update({_id:yellId}, {$set : {visible : false }})
        Notifications.remove({yellId:yellId})
        Comments.update({yellId:yellId},{$set : {visible : false }},{multi :true})
        PublicYells.update({refYellId:yellId},{$set : {visible : false }})

    },
    undoDeleteYell:function(yellId) {
        Yells.update({_id:yellId}, {$set : {visible : true }})
        PublicYells.update({refYellId:yellId},{$set : {visible : true }})
    },
    makeSuggestion:function(yellId,suggestions){
        Yells.update({_id:yellId}, {$set : {suggestionsByYellfi : suggestions }})
        sugsNumber = suggestions.length
        Yells.update({ _id: yellId }, {$inc: {cQ :sugsNumber}});
    },
    changeUserName:function(newName) {
        Meteor.users.update({_id:this.userId},{$set:{firstName:newName}})
    },
     changeUserPic:function(newPic) {
        Meteor.users.update({_id:this.userId},{$set:{picture:newPic}})
    }

});


