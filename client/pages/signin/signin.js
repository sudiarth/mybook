var pageSession = new ReactiveDict();

Template.signin.events({
	'click #signinButton' : function(e, t) {
    e.preventDefault();

    var email = t.find('#email').value.trim(),
        password = t.find('#password').value

    // check email
    if(email === "")
    {
      pageSession.set("alert", "Please enter your e-mail address.");
      t.find('#email').focus();
      return false;
    }

    // check password
    if(password === "")
    {
      pageSession.set("alert", "Please enter your password.");
      t.find('#password').focus();
      return false;
    }

    Meteor.loginWithPassword(email, password, function(error, id) {
      if (error)
      {
        pageSession.set("alert", error.reason);
        return false;
      }
      else
        FlowRouter.go("/");
        pageSession.set("alert", "");
    });
    return false; 
  }
});

Template.signin.helpers({
	alert: function() {
    return pageSession.get("alert");
  }
});