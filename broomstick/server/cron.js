SyncedCron.add({
	name: 'fetch desk usage status',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.recur().every(10).minute();
	},
	job: function() {
		Meteor.call('deskUsage');
		//return numbersCrunched;
	}
});

SyncedCron.start();
