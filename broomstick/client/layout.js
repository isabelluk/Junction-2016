Template.layout.helpers({
	'role': function() {
		var role = Session.get('role');
		if(role) {
			console.log("true");
			return true;
		}
	},
});
