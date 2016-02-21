var pageSession = new ReactiveDict();

Template.master.events({
  'click .logout': function () {
    Meteor.logout(function() {
      alert('Bye Diabook! Come back whenever you want!');
    });
  },
  'change #filePost': function(e, t) {

    var files = e.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i--) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          pageSession.set("photo", e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }

    // document.getElementById('filePost').addEventListener('change', this, false);
  
  },
   
  'click .remove' : function(e, t) {
    pageSession.set("photo", null);
  },

  'click #postButton': function(e,t) {

  	console.log("clicked");

    e.preventDefault();

    var text = trimInput(t.find("#textPost").value);
    var isPrivate = t.find("#isPrivate").checked;
    var files = pageSession.get("photo");

    if (isNotEmpty(text) && isNotEmpty(files)) {

      file = new FS.File(files);

      Binary.insert(file, function (err, fileObj) {
        
        if (err){
        
          pageSession.set('alert', err.reason);
        
        } else {
          
          var photoId = fileObj._id;
          pageSession.set('images', photoId);
          console.log(fileObj);
          console.log(fileObj._id);

          var doc = {
            text: text,
            isPrivate: isPrivate,
            photoId: photoId
          };

          Meteor.call('postStatus', doc, function(error, id) {
          
            if (error) {

              pageSession.set('alert', error.reason);
              
            } else {
              
              pageSession.set('alert', 'Your post has been published');
		          $("#textPost").val('');
		          pageSession.set("photo", null);
		          $('#myModal').modal('hide');
		          // window.location.href = '/';
            }
          
          });

        }

      });

    } else if (isNotEmpty(text)) {

      var doc = {
        text: text,
        isPrivate: isPrivate,
        photoId: 'undefined'
      };

      Meteor.call('postStatus', doc, function(error, id) {
      
        if (error) {

          pageSession.set('alert', error.reason);
          
        } else {
          
          pageSession.set('alert', 'Your post has been published');
          $("#textPost").val('');
          pageSession.set("photo", null);
          $('#myModal').modal('hide');
          // window.location.href = '/';
        }
      
      });

    } else {

      pageSession.set('alert', 'Please fill in all required fields');

    }

  }

});

Template.master.helpers({
  images: function () {
    return pageSession.get('images');
  },
  photo: function () {
    return pageSession.get("photo");
  },
  alert: function () {
    return pageSession.get("alert");
  },
  email: function () {
    return Meteor.user().emails[0].address;
  }
});