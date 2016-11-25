Meteor.methods({
	role: function() {
		if(this.userId) {
			userInfo = Meteor.users.findOne(this.userId);
			console.log(userInfo.role);
			if(userInfo && userInfo.role=="admin")
				return true;
			else
				return false;
		}
	}
});
