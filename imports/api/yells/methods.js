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

    }

});

