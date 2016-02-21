Meteor.methods({
  
  createNewUser: function (doc) {

    var email       = doc.email,
        password    = doc.password

    var userId      = Accounts.createUser({
      email         : email,
      password      : password,
      createdAt     : Date.now()
    });

    console.log('User was created on ' + Date.now());

  },

  updateProfileUser: function (doc) {
    
    var firstname   = doc.firstname,
        lastname    = doc.lastname

    Meteor.users.update({_id: Meteor.userId()}, 
      {$set:  {
        profile     : {
          firstName   : firstname,
          lastName    : lastname
        },
        updatedAt   : Date.now()
      }}
    );

  }

});