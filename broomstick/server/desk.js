Meteor.methods({
	freeDeskCount: function() {
		var deskList = [];
		var deskUsage = [];
		var requestUrl = "http://sprunge.us/FiBj"
		var freeCount = 0;

		try {
			var returnVector = HTTP.call('get', requestUrl);
			var json = JSON.parse(returnVector.content);
			for(var i=0; i<json.length; i++) {
				if(json[i].type=="desk") {
					deskList.push(json[i].data_source);
				}
			}

		}
		catch(err) {
			console.log(err);
			return String(err);
		}

		try {
			for(var i=0; i<deskList.length; i++) {
				var returnVector = "https://tieto.iottc.tieto.com/measurement/measurements?pageSize=1&dateFrom=2016-11-25&dateTo=2016-11-30&revert=true&source="+deskList[i];
				var returnVector = HTTP.call('get', returnVector, {
					auth: 'junction_hacker:e*@ND_2foa',
				});
				json = JSON.parse(returnVector.content);
				if(json.measurements.length>0) {
					deskUsage.push({ id: deskList[i], value: json.measurements[0].value });
					Desks.upsert({ id: deskList[i] }, { $set: { value: json.measurements[0].value } });
					if(json.measurements[0].value==0)
						freeCount++;
				}
			}
		}
		catch(err) {
			console.log(err);
			return String(err);
		}

		console.log(deskUsage);
		return freeCount;
	},
});
