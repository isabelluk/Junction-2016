Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('login', {data: {email: 'email'}});
});

Router.route('/register', function () {
  this.render('register');
});

Router.route('/dashboard', function (){
	this.render('dashboard');
})

Router.route('/profile', function () {
	this.render('profile');
})

Router.route('/desk',function(){
	this.render('desk');
})