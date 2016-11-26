Template.dashboard.helpers({
	'emptyDesks': function() {
		var userId = Meteor.userId();
		//if(userId) {
			var x = Desks.find({ value: 0 }).count();

			return x;
		//}
	}
});