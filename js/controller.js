define(function(require) {

	var Sony, HomeView, TitlesView, LoginView;

	var controller = {
		home: function() {
			console.log('home()');
			Sony = Sony || require('sony');
			HomeView = HomeView || require('views/home');
			var homeView = new HomeView();
			Sony.mainRegion.show(homeView);
		},
		titles: function() {
			console.log('titles()');
			Sony = Sony || require('sony');
			TitlesView = TitlesView || require('views/titles');
			var titlesView = new TitlesView();
			Sony.mainRegion.show(titlesView);
		},
		login: function() {
			console.log('login()');
			Sony = Sony || require('sony');
			LoginView = LoginView || require('views/login');
			var loginView = new LoginView();
			Sony.mainRegion.show(loginView);
		}

	};

	return controller;

});