define(['marionette'], function(Marionette){

	var LoginView = Marionette.CompositeView.extend({
		template: '#LoginTemplate',
		events: {
			'click .login button': 'login'
		},
		login: function(e) {

			e.preventDefault();
			console.log('login()');

			var username = this.$el.find('.username').val();
			var password = this.$el.find('.password').val();

			console.log('username:', username);
			console.log('password:', password);
		}
	});

	return LoginView;

});