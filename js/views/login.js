define(function(require){

		var Marionette = require('marionette');
		var mock = require('mock');
		var UserModel = require('models/user');

		require('cookie');

	var LoginView = Marionette.CompositeView.extend({
		template: '#LoginTemplate',
		events: {
			'click .login button': 'login'
		},
		server: null,
		initialize: function() {
			var sessionId = $.cookie('sessionId');
			var userId = $.cookie('userId');
			if (this.isSessionValid(userId, sessionId)) {
				this.persistUser(userId);
			}
		},
		getUser: function(userId) {
			var dfd = new $.Deferred();
			$.when(this.getUserData(userId))
			.then(function(data){
				dfd.resolve(new UserModel(data));
			});
			return dfd;
		},
		getUserData: function(userId) {
			var dfd = new $.Deferred();
			$.when($.ajax({ url: '/profile/' + userId }))
			.then(dfd.resolve)
			.fail(dfd.reject);
			mock.respond();
			return dfd;
		},
		isSessionValid: function(userId, sessionId) {
			//outside the scope of this exercise
			return (!!userId && !!sessionId);
		},
		login: function(e) {
			e.preventDefault();
			var username = this.$el.find('.username').val();
			var password = this.$el.find('.password').val();
			$.when($.ajax({ url: '/signin/' + username + '/' + password }))
			.then(this.loginSuccess.bind(this))
			.fail(this.loginFail);
			mock.respond();
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
			}).bind(this))
			.done(function(){
				document.location = '#profile';
			});
		},
		loginSuccess: function(data, textStatus, jqXHR) {
			var expiryDate = this.getExpiryDate(data.expiryTime);
			var sessionId = data.sessionId;
			var userId = data.userId;
			$.cookie('userId', userId, { expires: expiryDate, path: '/'});
			$.cookie('sessionId', sessionId, { expires: expiryDate, path: '/'});
			this.persistUser(userId);
		},
		loginFail: function() {
			$.removeCookie('sessionId');
			$.removeCookie('userId');
			$.removeCookie('user');
			$('.alert').show().alert();
			window.scrollTo(0, 0);
		}
	});

	return LoginView;

});