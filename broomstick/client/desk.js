function draw() {
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	var img = new Image();
	img.id = "floor_plan";
	img.src = "img/floor_plan.png";

	// Make sure the image is loaded first otherwise nothing will draw.
	img.onload = function(){
		try {
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
		}
		catch(err) {
			console.log(err);
		}
		finally {
			Desks.find({ value: 0 }).forEach(function(desk) {
				ctx.fillRect(desk.x/72.53*600-1,desk.y/72.53*600-1,5,5);
			});
		}
	}
}

Template.desk.onRendered(function() {
	draw();
});

Template.desk.helpers({
	'emptyDesks': function() {
		var userId = Meteor.userId();
		//if(userId) {
			var x = Desks.find({ value: 0 }).count();
			draw();
			return x;
		//}
	}
});
