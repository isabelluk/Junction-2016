Accounts.onLogin(function(user){
	var userId = Meteor.userId();
	Meteor.call('role', function(err, res) {
		if(res)
			Session.set('role', true);
		else
			Session.set('role', false);
	});
});

Meteor.logout(function(err) {
	Session.set('role', false);
});
