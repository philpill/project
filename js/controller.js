define(function(require) {

	var HomeView, TitlesView, LoginView, UserView, UserModel, TitleCollection, Mock, AboutView, RegisterView;

	HomeView = require('views/home');
	TitlesView = require('views/titles');
	TitleCollection = require('collections/title');
	LoginView = require('views/login');
	AboutView = require('views/about');
	TitlesView = require('views/titles');
	RegisterView = require('views/register');
	UserView = require('views/user');
	UserModel = require('models/user');
	Mock = require('mock');

	require('sinon');
	require('cookie');

	function getMockCollection(Collection, data) {
		var dfd = new $.Deferred();
		var collection = new Collection();
		var server = sinon.fakeServer.create();
		server.respondWith(Mock[data]);
		collection.fetch({
			success: function(data) {
				dfd.resolve(data);
			}
		});
		server.respond();
		return dfd;
	}

	function getUserModel(){
		var user = $.cookie('user');
		if (!user) {
			return null;
		}
		var userJSON = JSON.parse(user);
		var userModel = new UserModel(userJSON);
		return userModel;
	}

	function transitionPage(view, callback) {
		var Sony = require('sony');
		var page = $(Sony.mainRegion.el).find(':first-child');
		if (page.length === 0) {
			Sony.mainRegion.reset();
			Sony.mainRegion.show(view);
			if (typeof(callback) === 'function') { callback(); }
		} else {
			view.$el.css('display', 'none');
			view.$el.css('opacity', '0');
			page.find('> *').slideUp('fast', function(){
				Sony.mainRegion.reset();
				Sony.mainRegion.show(view);
				view.$el.slideDown(function(){
					$(this).animate({
						opacity: 1
					});
				});
				if (typeof(callback) === 'function') { callback(); }
			});
		}
	}

	var controller = {
		home: function() {
			var homeView = new HomeView();
			transitionPage(homeView);
		},
		titles: function() {
			$.when(getMockCollection(TitleCollection, 'titlesResponse'))
			.then(function(collection){
				var titlesView = new TitlesView({ collection : collection });
				transitionPage(titlesView, function() {
					$('.addTitle').remove();
				});
			});
		},
		login: function() {
			var loginView = new LoginView({ model : getUserModel() });
			transitionPage(loginView);
		},
		logout: function() {
			$.removeCookie('userId');
			$.removeCookie('sessionId');
			$.removeCookie('user');
			document.location = '#';
		},
		profile: function() {
			var userView = new UserView({ model : getUserModel() });
			transitionPage(userView);
		},
		profileNew: function() {
			var userView = new UserView();
			transitionPage(userView);
		},
		profileGames: function() {
			var Sony = require('sony');
			var collection = new TitleCollection();
			var user = getUserModel();
			var url = '/profile/' + user.get('userId') + '/titles/';
			collection.url = url;
			var server = sinon.fakeServer.create();
			server.respondWith(Mock.getUserTitlesResponse);
			collection.fetch({
				success: function(data) {
					var titlesView = new TitlesView({ collection : data, template: '#UserTitlesTemplate' });
					Sony.mainRegion.show(titlesView);
					transitionPage(titlesView, function(){
						//need subviews for these controls
						$('.titles li').append(' <a href="#" class="delete">delete</a>');
						titlesView.delegateEvents();
					});
				}
			});
			server.respond();
		},
		register: function() {
			var registerView = new RegisterView();
			transitionPage(registerView);
		},
		about: function() {
			var aboutView = new AboutView();
			transitionPage(aboutView);
		}
	};

	return controller;

});