Meteor.methods({
	deskUsage: function() {
		var deskList = [];
		var deskUsage = [];
		var requestUrl = "http://sprunge.us/FiBj"
		var freeCount = 0;

		try {
			var returnVector = HTTP.call('get', requestUrl);
			var json = JSON.parse(returnVector.content);
			for(var i=0; i<json.length; i++) {
				if(json[i].type=="desk") {
					deskList.push({ id: json[i].data_source, x: json[i].x, y: json[i].y });
				}
			}

		}
		catch(err) {
			console.log(err);
			return String(err);
		}

		try {
			for(var i=0; i<deskList.length; i++) {
				var returnVector = "https://tieto.iottc.tieto.com/measurement/measurements?pageSize=1&dateFrom=2016-11-25&dateTo=2016-11-30&revert=true&source="+deskList[i].id;
				var returnVector = HTTP.call('get', returnVector, {
					auth: 'junction_hacker:e*@ND_2foa',
				});
				json = JSON.parse(returnVector.content);
				console.log(json);
				if(json.measurements.length>0) {
					Desks.upsert({ id: deskList[i].id }, { $set: { x: deskList[i].x, y: deskList[i].y, value: json.measurements[0].value } });
					if(json.measurements[0].value==0)
						freeCount++;
				}
			}
		}
		catch(err) {
			console.log(err);
			return String(err);
		}

		return freeCount;
	},
});
