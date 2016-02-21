Template.home.helpers({
	hasTimeline: function () {
		var res = Posts.findOne();
		if (res) {
			return true;
		}
	},
	timeline: function () {
		return Posts.find({}, {sort: {createdAt: -1}});
	},
	photos: function (id) {
		return Photos.find({postId: id});
	}
});

Template.home.rendered = function () {

};