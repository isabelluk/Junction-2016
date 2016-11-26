Template.endUser.events({
	'click #empty_desk': function() {
		console.log('clicked empty desk');
		Session.set('pageState', 'empty_desk');
	},
	'click #ticketing': function() {
		console.log('clicked ticketing');
		Session.set('pageState', 'ticketing');
	},
	'click #home': function() {
		console.log('clicked home');
		Session.set('pageState', undefined);
	},
});
