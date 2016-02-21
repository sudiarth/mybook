Schema = {};

Schema.UserAddress = new SimpleSchema({
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  },
  country: {
    type: Schema.UserCountry,
    optional: true
  }
});

Schema.UserCountry = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/,
    optional: true
  }
});

Schema.UserProfile = new SimpleSchema({
  avatar: {
    type: String,
    optional: true
  },
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: true
  },
  organization : {
    type: String,
    optional: true
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  },
  address: {
    type: Schema.UserAddress,
    optional: true
  }
});

Schema.UserRoles = new SimpleSchema({
  admin: {
    type: Boolean
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  emails: {
    type: [Object],
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Schema.UserRoles,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.allow({

  insert: function (ownerId, doc) {
    return ownerId;
  },
  update: function (ownerId, doc, fields, modifier) {
    // can only change your own documents
    return ownerId === Meteor.userId();
  },
  remove: function (ownerId, doc) {
    // can only remove your own documents
    return ownerId === Meteor.userId();
  }

});

Meteor.users.deny({

  update: function  (ownerId, doc, fields, modifier) {
    //  Can't change  owners, createdAt
    return  _.contains(fields,  'ownerId')  ||  _.contains(fields, 'createdAt');
  }

});


if(Meteor.users.find().count() === 0) {

  var userId      = Accounts.createUser({
    username      : 'admin',
    email         : 'sudieartha@gmail.com',
    password      : '!secret',
    profile       : {
      firstName: 'Kadek',
      lastName: 'Sudiartha',
      birthday: '1989/09/21',
      gender: 'Male',
      country: {code: 'ID', name: 'Indonesia'},
      bio: 'Artist, Movie star'
    },
    createdAt     : Date.now()
	});

  console.log('User Sudiartha was created on ' + Date.now());

  //  add the roles to  our user
  Meteor.users.update({_id: userId}, {$set:  {roles: {admin: true}, updatedAt: Date.now()}});

  console.log('Add admin role');

}