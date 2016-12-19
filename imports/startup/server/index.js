import '../both.js';
import  '../../api/yells/server/publications.js';
import  '../../api/comments/server/publications.js';
import  '../../api/notifications/server/publications.js';
import  '../../api/publicYells/server/publications.js';
import './social-config.js'




import { Meteor } from 'meteor/meteor';
/*
Api= new Restivus({
  useDefaultAuth : true,
  prettyJSon:true
})
*/

Meteor.startup(function() {
//for index



Yells._ensureIndex({'loc':'2dsphere'});
Yells._ensureIndex({'publicPlanLoc':'2dsphere'});

});

