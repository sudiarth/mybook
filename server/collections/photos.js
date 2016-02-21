Schema = {};

Schema.Photos = new SimpleSchema({
  ownerId: {
    type: String
  },
  postId: {
    type: String
  },
  photoId: {
    type: String,
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

Photos.attachSchema(Schema.Photos, {transform: true});

// Allow

Photos.allow({

  insert: function (ownerId, doc) {
    return ownerId;
  },
  update: function (ownerId, doc, fields, modifier) {
    // can only change your own documents
    return doc.ownerId === Meteor.userId();
  },
  remove: function (ownerId, doc) {
    // can only remove your own documents
    return doc.ownerId === Meteor.userId();
  }

});

Photos.deny({

  update: function  (ownerId, doc, fields, modifier) {
    //  Can't change  owners, createdAt
    return  _.contains(fields,  'ownerId')  ||  _.contains(fields, 'createdAt');
  }

});