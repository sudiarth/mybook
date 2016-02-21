FlowRouter.route('/', {
	subscriptions: function(params) {
    this.register('posts', Meteor.subscribe('posts'));
    this.register('photos', Meteor.subscribe('photos'));
  },
  action: function() {
    BlazeLayout.render("master", {content: "home"});
  }
});

FlowRouter.route('/signin', {
  action: function() {
    BlazeLayout.render("master", {content: "signin"});
  }
});

FlowRouter.route('/signup', {
  action: function() {
    BlazeLayout.render("master", {content: "signup"});
  }
});

FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("master", {content: "post"});
  }
});