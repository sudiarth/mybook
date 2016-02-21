var pageSession = new ReactiveDict();

Template.signup.events({
	'click #signupButton' : function(e, t) {
    e.preventDefault();
    
    var email = t.find('#email').value.trim(),
        password = t.find('#password').value,
        confirmPassword = t.find('#confirmPassword').value

    // check lastname
    if(email == "")
    {
      pageSession.set("alert", "Please enter your first name.");
      t.find('#email').focus();
      return false;     
    }

    // check email
    if(password === "")
    {
      pageSession.set("alert", "Please enter your password");
      t.find('#password').focus();
      return false;     
    }

    // check email
    if(password !== confirmPassword)
    {
      pageSession.set("alert", "Both password not same");
      t.find('#confirmPassword').focus();
      return false;     
    }

    var doc = {email: email, password: password}

    Meteor.call('createNewUser', doc, function(error, id) {
  
      if (error) {

        pageSession.set('alert', error.reason);
      
      } else {

        FlowRouter.go('signin');
        pageSession.set("alert", "");

      }

    });
    return false;
  }
});

Template.signup.helpers({
	foo: function () {
		// ...
	}
});