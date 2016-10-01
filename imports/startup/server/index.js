import '../both.js';
import  '../../api/yells/server/publications.js';
import  '../../api/comments/server/publications.js';
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

