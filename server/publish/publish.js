Meteor.startup(function () {

  Meteor.publish('posts', function() {
    return Posts.find({});
  });

  Meteor.publish('photos', function() {
    return Photos.find({});
  });

  Meteor.publish('users', function() {
    return Meteor.users.find({});
  });

})