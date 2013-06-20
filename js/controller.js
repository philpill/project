define(function(require) {

	var Sony, HomeView, TitlesView, LoginView, UserView, UserModel, TitleCollection, Mock;

	HomeView = require('views/home');
	TitlesView = require('views/titles');
	TitleCollection = require('collections/title');
	LoginView = require('views/login');
	TitlesView = require('views/titles');
	UserView = require('views/user');
	UserModel = require('models/user');
	Mock = require('mock');

	require('sinon');

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
		var userJSON = JSON.parse(user);
		var userModel = new UserModel(userJSON);
		return userModel;
	}

	var controller = {
		home: function() {
			console.log('home()');
			Sony = Sony || require('sony');

			var homeView = new HomeView();
			Sony.mainRegion.show(homeView);
		},
		titles: function() {
			console.log('titles()');
			Sony = Sony || require('sony');
			$.when(getMockCollection(TitleCollection, 'titlesResponse'))
			.then(function(collection){
				var titlesView = new TitlesView({ collection : collection });
				Sony.mainRegion.show(titlesView);
			});
		},
		login: function() {
			console.log('login()');
			Sony = Sony || require('sony');
			var loginView = new LoginView({ model : getUserModel() });
			Sony.mainRegion.show(loginView);
		},
		profile: function() {
			console.log('profile()');
			Sony = Sony || require('sony');
			var userView = new UserView({ model : getUserModel() });
			Sony.mainRegion.show(userView);
		},
		profileGames: function() {
			console.log('profileGames()');
			Sony = Sony || require('sony');
			$.when(getMockCollection(TitleCollection, 'getUserTitlesResponse'))
			.then(function(collection){
				var titlesView = new TitlesView({ collection : collection });
				Sony.mainRegion.show(titlesView);
				$('.titles dt').append(' <a href="#" class="delete">delete</a>'); //totally the wrong place for this
			});
		}

	};

	return controller;

});