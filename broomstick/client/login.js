Template.login.events({
	'submit form': function(event){
		event.preventDefault();
		var usernameVar = event.target.txt_username.value;
		var passwordVar  = event.target.txt_password.value;
		console.log("Form submitted.");
		Meteor.loginWithPassword(usernameVar, passwordVar, function(err) {
			if (err) {
				Session.set('errorMessage', err.message);
			}
		});
	},

	'errorMessage': function() {
		return Session.get('errorMessage');
	},
});