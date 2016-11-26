var canvas;

Template.floorPlan.onRendered(function() {
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	var img = new Image();
	img.src = "img/floor_plan.png";

	// Make sure the image is loaded first otherwise nothing will draw.
	img.onload = function(){
		console.log("drawed");
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
	}
});
