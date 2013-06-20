define([
	'marionette',
	'mock',
	'models/user',
	'cookie',
	'sinon'
	], function(Marionette, Mock, UserModel){

	var server = sinon.fakeServer.create();

	var LoginView = Marionette.CompositeView.extend({
		template: '#LoginTemplate',
		events: {
			'click .login button': 'login',
			'click .logout': 'logout'
		},
		getTemplate: function(){
			var template = '#LoginTemplate';
			var sessionId = $.cookie('sessionId');
			var userId = $.cookie('userId');
			if (this.isSessionValid(userId, sessionId)) {
				template = '#LoggedinTemplate';
			}
			return template;
		},
		initialize: function() {
			var sessionId = $.cookie('sessionId');
			var userId = $.cookie('userId');
			if (this.isSessionValid(userId, sessionId)) {
				this.persistUser(userId);
			}
		},
		getUser: function(userId) {
			console.log('getUser()');
			var dfd = new $.Deferred();
			$.when(this.getUserData(userId))
			.then(function(data){
				dfd.resolve(new UserModel(data));
			});

			return dfd;
		},
		getUserData: function(userId) {
			console.log('getUserData()');
			console.log(userId);
			var dfd = new $.Deferred();

			server.respondWith('GET', '/profile/c778e312-b18a-4436-8757-2f46f84c8243',
				[200, {'Content-Type': 'application/json'},
				Mock.profileResponse]);

			$.when($.ajax({ url: '/profile/' + userId }))
			.then(dfd.resolve)
			.fail(dfd.reject);

			server.respond();

			return dfd;
		},
		isSessionValid: function(userId, sessionId) {

			//outside the scope of this exercise
			return (!!userId && !!sessionId);
		},
		login: function(e) {

			e.preventDefault();
			console.log('login()');

			var username = this.$el.find('.username').val();
			var password = this.$el.find('.password').val();

			console.log('username:', username);
			console.log('password:', password);

			server.restore();

			server = sinon.fakeServer.create();

			server.respondWith('GET', '/signin/alexw/0777999666',
				[200, {'Content-Type': 'application/json'},
				Mock.signinResponse]);

			$.when($.ajax({ url: '/signin/' + username + '/' + password }))
			.then(this.loginSuccess.bind(this))
			.fail(this.loginFail);

			server.respond();

		},
		getExpiryDate: function(timestamp) {

			var expiryTime = timestamp; //mock data is already expired
			expiryTime = new Date().setUTCDate((new Date()).getDate() + 1);

			return expiryTime;
		},
		persistUser: function(userId) {
			$.when(this.getUser(userId))
			.then((function(data){
				this.model = data;
				$.cookie('user', JSON.stringify(_.clone(data.attributes)));
			}).bind(this));
		},
		loginSuccess: function(data, textStatus, jqXHR) {
			console.log(data);
			console.log('success');

			var expiryDate = this.getExpiryDate(data.expiryTime);
			var sessionId = data.sessionId;
			var userId = data.userId;

			this.persistUser(userId);

			$.cookie('userId', userId, { expires: expiryDate, path: '/'});
			$.cookie('sessionId', sessionId, { expires: expiryDate, path: '/'});

			location.reload();
		},
		loginFail: function() {
			console.log('fail');
			$.removeCookie('sessionId');
		},
		logout: function(e) {
			e.preventDefault();

			$.removeCookie('userId');
			$.removeCookie('sessionId');

			document.location = '/';
		}
	});

	return LoginView;

});