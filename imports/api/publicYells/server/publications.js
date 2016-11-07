import { Meteor } from 'meteor/meteor';
import Yells from '../../yells/yells.js'
import PublicYells from '../publicYells.js'


Meteor.publishComposite('yellsForMap', {
    find: function() {
        // Find top ten highest scoring posts
        return PublicYells.find();
    },
    children: [
        {
            find: function(publicYell) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                return Yells.find(
                    { _id: publicYell.refYellId });
            },
                children: [
                {
                    find: function(yell,publicYell) {
                        // Find user that authored comment.
                        return Meteor.users.find(
                            { _id: yell.ownerId },
                            { limit: 1, fields: { profile: 1 } });
                    }
                }
            ]
        }
    ]
});

