import '../both.js';
import  '../../api/yells/server/publications.js'
//import  '../../api/plans/server/publications.js'
//import  '../../api/items/server/publications.js'
//import  '../../api/comments/server/publications.js'
//import '../../api/users/UserRest.js'

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
});


Meteor.publish("users", function () {
  return Meteor.users.find();
});
