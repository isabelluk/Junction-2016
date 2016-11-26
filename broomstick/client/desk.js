Template.desk.helpers({
	freeDeskCount: function() {
		var userId = Meteor.userId();
		var freeDesks;
		if(userId) {
			freeDesks = Desks.find({ value: 0 }).count();
			return freeDesks;
		}
	},
});
