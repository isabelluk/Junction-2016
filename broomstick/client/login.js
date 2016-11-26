Template.login.events({
	'submit form': function(event){
		event.preventDefault();
		var emailVar = event.target.txt_email.value;
		var passwordVar  = event.target.txt_password.value;
		console.log("Form submitted.");
		Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if (Meteor.user()) {
               console.log(Meteor.userId());
               Router.go('/dashboard');
            } else {
               console.log("ERROR: " + error.reason);
            }
         });
	},

	'errorMessage': function() {
		return Session.get('errorMessage');
	},
});